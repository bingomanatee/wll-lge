import {Store} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';
import propper from '@wonderlandlabs/propper';

import encodePath from '../js/encodePath';

const API_URL = process.env.API_URL;
const MD_SUFFIX = /\.md$/;

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
            return store.actions.getArticle(article.path);
          }
        }).catch((err) => {
          console.log('error creating articles:', err);
        });
    }, // todo: safety check
    newArticle(store, article, accessToken, sub) {
      return axios({
        method: 'POST',
        url: API_URL + '/articles',
        headers: {
          'access_token': accessToken,
          'sub': sub,
        },
        data: article
      })
        .then(() => {
          if (store.state.currentArticle && store.state.currentArticle.path === article.path) {
            return store.actions.getArticle(article.path);
          }
        }).catch((err) => {
          console.log('error creating articles:', err);
        });
    }, // todo: safety check
    getArticle(store, path) {
      return axios.get(API_URL + '/articles/' + encodeURIComponent(path))
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

export class Article {
  constructor(props) {
    if (props && _.isObject(props)) {
      Object.assign(this, props);
    }
  }

  get isValid() {
    return _.isEmpty(this.errors);
  }

  // like path, but without .md extension
  get rootPath() {
    return ((this.directory? (this.directory + '/') : '') + this.filename.replace(MD_SUFFIX, ''));
  }

  get path() {
    return ((this.directory? (this.directory + '/') : '') + this.filename.replace(MD_SUFFIX, '') + '.md');
  }

  toJSON() {
    let j = _.pick(this, 'filename,title,content,directory,published,onHomepage,description,path'.split(','));
    return j;
  }

  save(token, sub, isNew = false) {
    const j = this.toJSON();
    console.log('saving ------', j);
    return isNew ? articles.actions.newArticle(j, token, sub) :  articles.actions.saveArticle(j, token, sub);
  }
}

function errMgr(name){
  return {
    onInvalid: function (value, error, article) {
      if (article) article.errors[name] = error;
    },
    onChange: function () {
      delete this.errors[name];
    }
  };
}

propper(Article)
  .addProp('errors', {
    defaultValue: () => ({}),
    type: 'object'
  })
  .addProp('content', {
    required: true,
    type: 'string',
    ...errMgr('content')
  })
  .addProp('description', {
    defaultValue: '',
    type: 'string',
    ...errMgr('content')
  })
  .addProp('published', {
    defaultValue: () => true,
    type: 'boolean',
    ...errMgr('published')
  })
  .addProp('onHomepage', {
    defaultValue: () => true,
    type: 'boolean',
    ...errMgr('onHomepage')
  })
  .addProp('title', {
    required: true,
    type: 'string',
    ... errMgr('title')
  })
  .addProp('filename', {
    required: true,
    type: 'string',
    ... errMgr('title')
  })
  .addProp('directory', {
    required: true,
    type: 'string',
    ... errMgr('title')
  });


export default articles;
