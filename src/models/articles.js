import {Store} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';

const API_URL = process.env.API_URL;

const asPath = (input) => {
  if (!input) {
    return '';
  } else if (_.isObject(input) && input.path) {
    return input.path;
  } else {
    return _.toString(input);
  }
};

const encodePath = (path) => encodeURIComponent(path).replace(/\./g, '%2E');

function articleUrl(path) {
  const shortPath = encodePath(asPath(path));
  return `${API_URL}/articles/${shortPath}.json`;
}

const articles = new Store({
  state: {},
  actions: {
    saveArticle(store, article, apiToken, sub) {
      return axios({
        method: 'PUT',
        url: articleUrl(article),
        headers: {
          'access_token': apiToken,
          'sub': sub,
        },
        data: article
      })
        .then(() => {
          if (store.state.currentArticle && store.state.currentArticle.path === article.path){
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
    }
  },
  starter: ({actions}) => {
    axios.get('https://wonderland-labs.herokuapp.com/api/homepage-articles')
      .then((response) => {
        actions.setHomepageArticles(response.data);
      });
  }
}).addProp('homepageArticles', {start: []})
  .addProp('articles', {start: []})
  .addProp('currentArticle', {start: false});

articles.start();

export default articles;
