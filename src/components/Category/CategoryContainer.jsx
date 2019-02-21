import React, {Component} from 'react';
import CategoryView from './CategoryView';
import axios from 'axios';

import categories from '../../models/categories';
import userStore from '../../models/user';
import ArticleView from "../Article/ArticleView";

const API_URL = process.env.API_URL;

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directory: props.match.params.directory,
      category: {},
      categoryArticles: [],
      loaded: false, catLoaded: false
    };
  }

  componentDidMount() {
    if (!this.state.loaded && this.state.directory) {
      const directory = decodeURIComponent(this.state.directory);
      axios.get(
        API_URL + '/articles').then(result => {
        let articles = result.data.filter(a => {
          return a.published && a.directory === directory;
        });
        this.setState({categoryArticles: articles, loaded: true});
      })
        .catch(err => {
          console.log('cannot get article', err);
        });
    }

    this._catSub = categories.subscribe(({state}) => {
      let directory = decodeURIComponent(this.state.directory);
      if (state.categories) {
        let matches = state.categories.filter(c => c.directory === directory);
        if (matches.length) {
          console.log('category: ', matches);
          this.setState({category: matches[0], catLoaded: true});
        }
      }
    });

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
      <CategoryView
        toggleEdit={() => this.toggleEdit()}
        {...this.state}>
      </CategoryView>
    );
  }
}
