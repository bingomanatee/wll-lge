import React, { Component } from 'react';
import ArticleEditView from './ArticleEditView';
import userStore from '../../models/user';
import articleStore from '../../models/articles';
import _ from 'lodash';

export default class ArticleEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {path: props.path, title: '', content: '', loaded: false, editing: false};
  }

  componentDidMount() {
    if (!this.state.loaded && this.state.path) {
      articleStore.actions.getArticle(this.state.path)
        .then(() => {
          this.setState({...articleStore.state.currentArticle, loaded: true});
        })
        .catch(err => {
          console.log('cannot get article', err);
        });
    }

    this._userSub = userStore.subscribe(({state}) => {
      this.setState({
        user: state.user,
        isAdmin: state.isAdmin
      });
    });
  }

  async save() {
    if (!this.state.title && this.state.content) {
      return alert('you cannot publish an article without a title or content');
    }

    if (!this.state.isAdmin) {
      return alert('you are not an administrative user -- you cannot edit articles');
    }
    if (_.get(articleStore, 'state.currentArticle.path' !== this.state.path)){
      return articleStore.actions.getArticle(this.state.path)
        .then(() => this.save());
    }
    let newArticle = {... articleStore.state.currentArticle};
    newArticle.published = this.state.published;
    newArticle.title = this.state.title;
    newArticle.content = this.state.content;
    newArticle.onHomepage = this.state.onHomepage;

    await articleStore.actions.saveArticle(newArticle, userStore.state.acessToken, userStore.state.sub);
    await articleStore.actions.getArticle(this.state.path);
    console.log('asserting new version of  article: ', articleStore.state.currentArticle);
    this.setState(newArticle);// @TODO: inspect result for match
    if (this.props.onSave) this.props.onSave();
  }

  setContent(content) {
    this.setState({content});
  }

  setTitle(title){
    this.setState({title});
  }

  componentWillUnmount() {
    if (this._userSub) this._userSub.unsubscribe();
  }

  togglePublished() {
    let onHomepage = this.state.onHomepage;
    if (this.state.published) onHomepage = false; // remove hidden articles from homepage
    this.setState({published: !this.state.published, onHomepage});
  }

  toggleOnHomepage() {
    this.setState({onHomepage: !this.state.onHomepage});
  }

  render() {
    return (
      <ArticleEditView
        {...this.state}
        setContent={(value) => this.setContent(value)}
        setTitle={(value) => this.setTitle(value)}
        togglePublished={() => this.togglePublished()}
        toggleOnHomepage={() => this.toggleOnHomepage()}
        save={() => this.save()}> </ArticleEditView>
    );
  }
}
