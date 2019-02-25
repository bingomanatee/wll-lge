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
    this._mounted = true;
    this._artSub = articles.subscribe(({state}) => {
      if (this._mounted) this.setState(state);
    });

    this._userSub = userStore.subscribe(({state}) => {
      const {sub, accessToken} = state;
      if (sub !== this.state.sub || accessToken !== this.state.accessToken) {
        if (this._mounted) this.setState({
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
    this._mounted = false;
  }

  render() {
    return (
      <HomepageView {...this.state}>
      </HomepageView>
    );
  }
}
