import {Store} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';

const articles = new Store({
  state: {},
  starter: ({actions}) => {
    axios.get('https://wonderland-labs.herokuapp.com/api/homepage-articles')
      .then((response) => {
        actions.setHomepageArticles(response.data);
      });
  }
}).addProp('homepageArticles', {start: []})
  .addProp('articles', {start: []});

articles.start();

export default articles;
