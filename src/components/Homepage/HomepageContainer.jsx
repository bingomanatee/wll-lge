import React, { Component } from 'react';
import HomepageView from './HomepageView';
import _ from 'lodash';
import articles from '../../models/articles';
import userStore from '../../models/user';

export default class HomepageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homepageArticles: []
    };
  }

  componentDidMount() {
    this._artSub = articles.subscribe(({state}) => {
      this.setState(state);
    });

    this._userSub = userStore.subscribe(({state}) => {
      const {sub, accessToken} = state;
      if (sub !== this.state.sub || accessToken !== this.state.accessToken) {
        this.setState({
          sub, accessToken
        }, () => {
          articles.actions.getHomepageArticles(sub, accessToken);
        });
      }
    });
  }

  componentWillUnmount() {
    if (this._artSub) this._artSub.unsubscribe();
    if (this._userSub) this._userSub.unsubscribe();
  }

  render() {
    return (
      <HomepageView {...this.state}>
      </HomepageView>
    );
  }
}
