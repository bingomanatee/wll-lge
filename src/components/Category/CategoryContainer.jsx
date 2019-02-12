import React, {Component} from 'react';
import CategoryView from './CategoryView';
import axios from 'axios';

import categories from '../../models/categories';

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
      axios.get(
        'https://wonderland-labs.herokuapp.com/api/articles').then(result => {
        let directory = decodeURIComponent(this.state.directory);
        console.log('cat result:', result);
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
      console.log('gotten cats:', state);
      if (state.categories) {
        let directory = decodeURIComponent(this.state.directory);
        let matches = state.categories.filter(c => c.directory === directory);
        if (matches.length) {
          this.setState({category: matches[0], catLoaded: true});
        }
      }
    });
  }

  render() {
    return (
      <CategoryView {...this.state}>
      </CategoryView>
    );
  }
}
