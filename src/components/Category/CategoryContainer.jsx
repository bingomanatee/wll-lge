import React, {Component} from 'react';
import CategoryView from './CategoryView';
import categories, {Category} from '../../models/categories';
import userStore from '../../models/user';
import articlesStore from '../../models/articles';

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    let directory = decodeURIComponent(this.props.match.params.directory);
    this.state = {
      directory,
      category: {},
      categories: [],
      categoryArticles: [],
      loaded: false,
      catLoaded: false
    };
  }

  componentDidMount() {
    this._catSub = categories.subscribe(({state}) => {
      if (state.categories) {
        this.setState({categories: state.categories, catLoaded: true}, () => {
          this.reflectCurrentCat();
        });
      }
    });

    this._userSub = userStore.subscribe(({state}) => {
      this.setState({
        user: state.user,
        isAdmin: state.isAdmin
      });
    });

    this._histUnListener = this.props.history.listen(() => {
      requestAnimationFrame(() => {
        this.reflectCurrentCat();
      });
    });
  }

  coomponentWillUnmount() {
    if (this._histUnListener) {
      this._histUnListener();
    }
  }

  async reflectCurrentCat() {
    let directory = decodeURIComponent(this.props.match.params.directory);
    if (!directory) {
      console.log('no directory in place');
      this.props.history.push('/');
      return;
    }
    let category = await Category.get(directory);
    this.setState({...category.toJSON(), categoryArticles: category.articles, loaded: true});
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
      <CategoryView
        toggleEdit={() => this.toggleEdit()}
        {...this.state} content={this.state.content || ''}>
      </CategoryView>
    );
  }
}
