import React, { Component } from 'react';
import NavbarView from './NavbarView';

import categories from '../../models/categories';
import userStore from '../../models/user';

export default class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {categories:[], user: false, userStore};
  }

  componentDidMount() {
    this._mounted = true;
    this._catSub = categories.subscribe(({state}) => {
      this.setState({categories: state.categories || []});
    });

    this._userSub = userStore.subscribe(({state}) => {
      if (this._mounted) this.setState({
        user: state.user || false,
        isAdmin: state.isAdmin,
      });
    });
  }

  componentWillUnmount(){
    this._mounted = false;
    if (this._catSub) this._catSub.unsubscribe();
    if (this._userSub) this._userSub.unsubscribe();
  }

  gotoCategory({title}) {
    console.log('go to category', title);
  }

  get categories() {
    if (!this.state.categories) return [];
    if (!this.state.isAdmin) return this.state.categories.filter(c => c.published);
    return this.state.categories.slice(0);
  }

  render() {
    const props = { ...this.props };
    delete props.children;
    return (
      <NavbarView {...this.state} categories={this.categories} gotoCategory={(name) => this.gotoCategory(name)}>
      </NavbarView>
    );
  }
}
