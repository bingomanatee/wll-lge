import React, {Component} from 'react';
import CategoryView from './CategoryView';
import axios from 'axios';

import categories from '../../models/categories';
import userStore from '../../models/user';

const API_URL = process.env.API_URL;

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.reflectCurrentCat()
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

    console.log('RCC: ', directory);
    let matches = this.state.categories.filter(c => c.directory === directory);
    this.setState({directory, category: matches[0]});

    axios.get(
      API_URL + '/articles').then(result => {
      let articles = result.data.filter(a => {
        return a.directory === directory;
      });
      this.setState({categoryArticles: articles, loaded: true});
    })
      .catch(err => {
        console.log('cannot get article', err);
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
