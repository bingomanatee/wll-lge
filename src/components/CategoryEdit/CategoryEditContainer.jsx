import React, {Component} from 'react';
import CategoryEditView from './CategoryEditView';
import categories from '../../models/categories';
import userStore from '../../models/user';
import articlesStore from '../../models/articles';


export default class CategoryEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      directory: props.directory,
      categories: [],
      categoryArticles: [],
      loaded:
        false, catLoaded:
        false
    };
  }

  componentDidMount() {
    this._userSub = userStore.subscribe(({state}) => {
      this.setState({
        user: state.user,
        sub: state.sub,
        accessToken: state.accessToken,
        isAdmin: state.isAdmin
      }, () => {
        this.reflectCurrentCat();
      });
    });
  }

  coomponentWillUnmount() {
    if (this._userSub) {
      this._userSub.unsubscribe();
    }
    if (this._catSub) {
      this._catSub.unsubscribe();
    }
  }

  reflectCurrentCat() {
    let directory = this.props.directory;
    const {sub, accessToken} = this.state;
    let matches = this.state.categories.filter(c => c.directory === directory);
    this.setState({directory, category: matches[0]}, () => {
      articlesStore.actions.getCategoryArticles(directory, accessToken, sub)
        .then(() => {
          console.log('articles for dir', directory, '---->', articlesStore.state.categoryArticles);
          this.setState({directory, categoryArticles: articlesStore.state.categoryArticles, loaded: true});
        });
    });

  }

  componentWillUnmount() {
    if (this._userSub) {
      this._userSub.unsubscribe();
    }
  }

  render() {
    return (
      <CategoryEditView {...this.state}>
      </CategoryEditView>
    );
  }
}
