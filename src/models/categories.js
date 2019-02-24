import {Store} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import encodePath from '../js/encodePath';

const API_URL = process.env.API_URL;

const categories = new Store({
  state: {},
  actions: {
    getCategory(store, directory, accessToken, sub) {
      return axios.get(
        API_URL + '/categories/' + encodePath(directory), {
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

export default categories;
