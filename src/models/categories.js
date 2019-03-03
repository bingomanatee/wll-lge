import {Store} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import encodePath from '../js/encodePath';
import _ from 'lodash';
import propper from '@wonderlandlabs/propper';

const API_URL = process.env.API_URL;

export function categoryUrl(directory) {
  if (_.isObject(directory)) {
    if ('directory' in directory) {
      return categoryUrl(directory.directory);
    }
    throw new Error('bad input to categoryUrl', directory);
  }
  directory = directory.replace(/\.[\w]+$/, '');
  return `${API_URL}/categories/${encodePath(directory)}.json`;
}

const categories = new Store({
  state: {},
  actions: {
    getCategory(store, directory, accessToken, sub) {
      return axios.get(
        categoryUrl(directory), {
          headers: {
            'access_token': accessToken,
            'sub': sub,
          },
        })
        .then(result => result.data)
        .then(da => {
          store.actions.setCategory(da);
        });
    },
  },
  starter: ({actions}) => {
    axios.get(API_URL + '/categories')
      .then(({data}) => {
        actions.setCategories(data);
      });
  }
})
  .addProp('categories', {start: []})
  .addProp('category', {start: false})
  .addProp('current', {start: false});

categories.start();

function errMgr(name) {
  return {
    onInvalid: function (value, error, article) {
      if (article) {
        article.errors[name] = error;
      }
    },
    onChange: function () {
      delete this.errors[name];
    },
  };
}

export class Category {
  constructor(props, isNew = true) {
    if (props === true || props === false) {
      isNew = props;
      props = {};
    }

    this.isNew = isNew;
    if (props && _.isObject(props)) {
      let data = {...props};
      Object.assign(this, data);
    }
  }

  get isValid() {
    return _.isEmpty(this.errors);
  }

  toJSON() {
    let j = _.pick(this,
      'title,content,directory,published,sequence'.split(','));
    return j;
  }

  save(token, sub, isNew = null) {
    if (isNew !== null) {
      this.isNew = isNew;
    }
    return this.isNew ? this.insert(token, sub) : this.update(token, sub);
  }

  /** ********** METHODS ********** */

  isExists() {
    return Category.exists(this.directory);
  }

  async insert(token, sub) {
    /** todo: overwrite protection */
    await axios({
      method: 'POST',
      url: categoryUrl(this),
      headers: {
        'access_token': token,
        'sub': sub,
      },
      data: this.toJSON()
    });
    await this.get(true);
    this.isNew = false;
    return this;
  }

  async update(token, sub) {
    await axios({
      method: 'PUT',
      url: categoryUrl(this),
      headers: {
        'access_token': token,
        'sub': sub,
      },
      data: this.toJSON()
    });
    // re-write local data with remote data
    await this.load(true);
    this.isNew = false;
    return this;
  }

  /**
   * returns a new category with
   * @returns {Promise<Article>} a new category unless true is passed in.
   */
  async load(replace = false) {
    const result = await axios.get(categoryUrl(this.directory));
    let data = {...result.data};
    if (data.directory !== this.directory) {
      throw new Error('bad category returned for ', +this.directory);
    }

    if (replace) {
      return Object.assign(this, data);
    }
    return new Category(data);
  }

  static async get(directory) {
    const result = await axios.get(categoryUrl(directory));
    return new Category(result.data);
  }

  static async all() {
    const result = axios.get(API_URL + '/categories');
    return result.data.map(params => new Category(params));
  }

  static async exists(directory) {
    try {
      let c = await Category.get(directory);
      return !!c;
    } catch (err) {
      return false;
    }
  }
}

propper(Category)
  .addProp('errors', {
    defaultValue: () => ({}),
    type: 'object'
  })
  .addProp('content', {
    required: true,
    type: 'string',
    ...errMgr('content')
  })
  .addProp('sequence', {
    required: true,
    type: 'integer',
    ...errMgr('sequence')
  })
  .addProp('published', {
    defaultValue: () => true,
    type: 'boolean',
    ...errMgr('published')
  })
  .addProp('title', {
    required: true,
    type: 'string',
    ... errMgr('title')
  })
  .addProp('directory', {
    required: true,
    type: 'string',
    defaultValue: '',
    ... errMgr('title')
  });


export default categories;
