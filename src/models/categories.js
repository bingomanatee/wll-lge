import {Store} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';

const categories = new Store({
  state: {},
  starter: ({actions}) => {
    axios.get('https://wonderland-labs.herokuapp.com/api/categories')
      .then(({data}) => {
        actions.setCategories(data);
      });
  }
})
  .addProp('categories', {start: []})
  .addProp('current', {start: false});

categories.start();

export default categories;
