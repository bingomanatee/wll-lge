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
    this.state = {
      published: true,
      onHomepage: false,
      content: '',
      title: 'New Article',
      errors: false,
      filename: 'new_filename',
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

  setCategory(directory) {
    this.setState({directory, errors: false}, () => {
      this.validate();
      this.checkPath();
      this.checkTitle();
    });
  }

  checkPath(){
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
    if (!(sub && accessToken)){
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
          const article =  this.article();
          article.save(accessToken, sub, true)
            .then(() => {
              this.props.history.push('/article/' + encodePath(article.path));
            });
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
      const article =  this.article();
      let errors = false;
      if (!_.isEmpty(article.errors)) {
        errors = {...article.errors};
      }
      if (this._mounted) {
        this.setState({errors}, () => done(errors));
      } else {
        done(errors);
      }
    });
  }

  render() {
    console.log('directory --- ', this.state.directory);
    return (
      <NewArticleView {...this.state}
        setContent={(content) => this.setContent(content)}
        setFilename={(filename) => this.setFilename(filename)}
        setTitle={(title) => this.setTitle(title)}
        setCategory={(category) => this.setCategory(category)}
        toggleOnHomepage={() => this.toggleOnHomepage()}
        togglePublished={() => this.togglePublished()}
        save={() => this.save()}
      >
      </NewArticleView>
    );
  }
}
