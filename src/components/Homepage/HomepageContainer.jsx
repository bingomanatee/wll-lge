import React, { Component } from 'react';
import HomepageView from './HomepageView';
import _ from 'lodash';
import articles from '../../models/articles';

export default class HomepageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homepageArticles: []
    };
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    articles.subscribe(({state}) => {
      console.log('article state: ', state);
      this.setState(state);
    });
  }

  render() {
    console.log('state: ', this.state);
    return (
      <HomepageView {...this.state}>
      </HomepageView>
    );
  }
}
