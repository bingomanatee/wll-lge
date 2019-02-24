import React, {Component} from 'react';
import CategoryView from './CategoryView';
import axios from 'axios';

import categories from '../../models/categories';
import userStore from '../../models/user';
import articlesStore from '../../models/articles';

const API_URL = process.env.API_URL;

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    let directory = decodeURIComponent(this.props.match.params.directory);
    this.state = {
      directory,
      category: {},
      categories: [],
      categoryArticles: [],
      loaded:
        false, catLoaded:
        false
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

  reflectCurrentCat() {
    let directory = decodeURIComponent(this.props.match.params.directory);
    let matches = this.state.categories.filter(c => c.directory === directory);
    this.setState({directory, category: matches[0]});
    articlesStore.actions.getCategoryArticles(directory)
      .then(() => {
        console.log('category articles!', articlesStore.state.categoryArticles);
        this.setState({categoryArticles: articlesStore.state.categoryArticles, loaded: true});
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
      <CategoryView
        toggleEdit={() => this.toggleEdit()}
        {...this.state}>
      </CategoryView>
    );
  }
}
