import React, {Component} from 'react';
import _ from 'lodash';

import NewArticleView from './NewArticleView';
import {Article} from '../../models/articles';
import userStore from '../../models/user';
import encodePath from '../../js/encodePath';

const ARTICLE_FIELDS = 'content,title,published,onHomepage,filename,directory'.split(',');

export default class NewArticleContainer extends Component {
  constructor(props) {
    super(props);
    let directory = '';
    let filename = 'new_article';
    const path = _.get(props, 'match.params.path', '');
    console.log('========= params path: ', path);
    if (path) {
      const decoded = decodeURIComponent(path);
      const parts = /^(.*)\/([^/]+)(\.md)?$/.exec(decoded);
      if (parts) {
        filename = parts[2];
        directory = parts[1];
      }
    }

    this.state = {
      published: true,
      onHomepage: false,
      directory,
      filename,
      content: '',
      title: 'New Article',
      errors: false,
      exists: false,
      sameTitle: false,
    };
  }

  setContent(content) {
    this.setState({content, errors: false}, () => this.validate());
  }

  setFilename(filename) {
    this.setState({filename, errors: false}, () => {
      this.checkPath();
      this.validate();
    });
  }

  setTitle(title) {
    this.setState({title, errors: false}, () => {
      this.validate();
      this.checkTitle();
    });
  }

  setDirectory(directory) {
    this.setState({directory, errors: false}, () => {
      this.validate();
      this.checkPath();
      this.checkTitle();
    });
  }

  checkPath() {
    if (!this.article) {
      this.setState({exists: false});
      return;
    }

    this.article().isExists()
      .then((exists) => {
        this.setState({exists});
      });
  }

  async checkTitle() {
    let sameTitle = false;
    if (this.state.directory && this.state.title) {
      const articles = await Article.forDirectory(this.state.directory);
      sameTitle = !!_.find(articles, {title: this.state.title});
    }
    this.setState({sameTitle});
  }

  togglePublished() {
    this.setState({published: !this.state.published, errors: false}, () => this.validate());
  }

  toggleOnHomepage() {
    this.setState({onHomepage: !this.state.onHomepage, errors: false}, () => this.validate());
  }

  save() {
    console.log('saving');

    const {accessToken, sub} = userStore.state;
    if (!(sub && accessToken)) {
      console.log('cannot save - not logged in');
      return;
    }

    this.validate()
      .then((errors) => {
        if (errors) {
          console.log('save:errors:', errors);
          this.setState({errors});
        }
        else {
          console.log('can save');
          const article = this.article();
          article.save(accessToken, sub, !this.state.exists)
            .then(() => {
              console.log('writing....');
              eval('debugger');
              this.props.history.push('/article/' + encodePath(article.path));
            })
            .catch((err)=> {
              console.log('error saving: ', err);
            })
        }
      })
      .catch((err) => {
        console.log('error validating:', err);
      });
  }

  article() {
    let data = _.pick(this.state, ARTICLE_FIELDS);
    return new Article(data, !this.state.exists);
  }

  validate() {
    return new Promise((done) => {
      const article = this.article();
      let errors = false;
      if (!_.isEmpty(article.errors)) {
        errors = {...article.errors};
      }
      if (this._mounted) {
        this.setState({errors}, () => done(errors));
      }
      else {
        done(errors);
      }
    });
  }

  componentDidMount(){
    const path = _.get(this.props, 'match.params.path', '');
    if (path) {
      const decoded = decodeURIComponent(path);
      console.log('existing path:', path, decoded);
      Article.get(decoded)
        .then((article) => {
          this.setState({exists: true, ...article.toJSON()});
        });
    }
  }

  render() {
    return (
      <NewArticleView {...this.state}
        setContent={(content) => this.setContent(content)}
        setFilename={(filename) => this.setFilename(filename)}
        setTitle={(title) => this.setTitle(title)}
        setDirectory={(category) => this.setDirectory(category)}
        toggleOnHomepage={() => this.toggleOnHomepage()}
        togglePublished={() => this.togglePublished()}
        save={() => this.save()}
      >
      </NewArticleView>
    );
  }
}
