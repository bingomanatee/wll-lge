import {Store} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';
import encodePath from '../js/encodePath';

const API_URL = process.env.API_URL;

const asPath = (input) => {
  if (!input) {
    return '';
  }
  else if (_.isObject(input) && input.path) {
    return input.path;
  }
  else {
    return _.toString(input);
  }
};

function articleUrl(path) {
  const shortPath = encodePath(asPath(path));
  return `${API_URL}/articles/${shortPath}.json`;
}

const articles = new Store({
  state: {},
  actions: {
    getCategoryArticles(store, directory, accessToken, sub) {
      return axios.get(
        API_URL + '/categories/' + encodePath(directory), {
          headers: {
            'access_token': accessToken,
            'sub': sub,
          },
        })
        .then(result => result.data.articles)
        .then(da => store.actions.setCategoryArticles(da));
    },
    saveArticle(store, article, accessToken, sub) {
      return axios({
        method: 'PUT',
        url: articleUrl(article),
        headers: {
          'access_token': accessToken,
          'sub': sub,
        },
        data: article
      })
        .then(() => {
          if (store.state.currentArticle && store.state.currentArticle.path === article.path) {
            store.actions.getArticle(article.path);
          }
        }).catch((err) => {
          console.log('error creating articles:', err);
        });
    }, // todo: safety check
    getArticle(store, path) {
      return axios.get(
        API_URL + '/articles/'
        + encodeURIComponent(path)
      )
        .then(result => {
          store.actions.setCurrentArticle(result.data);
        })
        .catch(err => {
          console.log('cannot get article', err);
          this.setCurrentArticle(false);
        });
    },
    getHomepageArticles(store, sub = '', apiToken = '') {
      return axios.get(API_URL + '/homepage-articles',
        {
          headers: {
            'access_token': apiToken,
            'sub': sub,
          },
        })
        .then((response) => store.actions.setHomepageArticles(response.data));
    }
  },
  starter: ({actions}) => actions.getHomepageArticles()
}).addProp('homepageArticles', {start: []})
  .addProp('categoryArticles', {start: []})
  .addProp('articles', {start: []})
  .addProp('currentArticle', {start: false});

articles.start();

export default articles;
