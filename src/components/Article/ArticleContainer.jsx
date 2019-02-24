import React, {Component} from 'react';
import ArticleView from './ArticleView';

import userStore from '../../models/user';
import articleStore from '../../models/articles';
import categoryStore from '../../models/categories';

export default class ArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {path: props.match.params.path, title: '', content: '', loaded: false, isEditing: false};
  }

  componentDidMount() {
    if (!this.state.loaded && this.state.path) {
      articleStore.actions.getArticle(this.state.path)
        .then(() => {
          const article = articleStore.state.currentArticle;
          const directory = article.directory;
          if (directory) {
            categoryStore.actions.getCategory(directory)
              .then(() => {
                this.setState(categoryStore.state);
              });
          }
          this.setState({...article, loaded: true});
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

  toggleEdit() {
    if (!this.state.isAdmin) {
      return this.setState({isEditing: false});
    }
    this.setState({isEditing: !this.state.isEditing});
  }

  componentWillUnmount() {
    if (this._userSub) {
      this._userSub.unsubscribe();
    }
  }

  render() {
    return (
      <ArticleView {...this.state} toggleEdit={() => this.toggleEdit()}> </ArticleView>
    );
  }
}
