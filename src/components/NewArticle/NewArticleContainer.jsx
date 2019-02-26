import React, {Component} from 'react';
import _ from 'lodash';

import NewArticleView from './NewArticleView';
import {Article} from '../../models/articles';
import userStore from '../../models/user';
import encodePath from '../../js/encodePath';

export default class NewArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      published: true,
      onHomepage: false,
      content: '',
      title: 'New Article',
      errors: false,
      filename: 'new_filename'
    };
  }

  setContent(content) {
    this.setState({content, errors: false}, () => this.validate());
  }

  setFilename(filename) {
    this.setState({filename, errors: false}, () => this.validate());
  }

  setTitle(title) {
    this.setState({title, errors: false}, () => this.validate());
  }

  setCategory(directory) {
    this.setState({directory, errors: false}, () => this.validate());
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
              this.props.history.push('/article/' + (article.path));
            });
        }
      })
      .catch((err) => {
        console.log('error validating:', err);
      });
  }

  article() {
    let data = _.pick(this.state, 'content,title,published,onHomepage,filename,directory'.split(','));
    return new Article(data);
  }

  componentDidMount() {
  }

  validate() {
    return new Promise((done) => {
      let data = _.pick(this.state, 'content,title,published,onHomepage,filename,directory'.split(','));
      try {
        let article = new Article();
        Object.assign(article, data);
        let errors = false;
        if (!_.isEmpty(article.errors)) {
          errors = {...article.errors};
        }
        if (this._mounted) {
          this.setState({errors}, () => done(errors));
        } else {
          done(errors);
        }
      } catch (errors) {
        if (this._mounted) {
          this.setState({errors}, () => done(errors));
        }
        else {
          done(errors);
        }
      }
    });
  }

  render() {
    const props = {...this.props};
    delete props.children;
    if (this.state.errors) {
      console.log('errors in state: ', this.state.errors);
    }
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
