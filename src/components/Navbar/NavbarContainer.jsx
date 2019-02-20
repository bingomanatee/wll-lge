import React, { Component } from 'react';
import NavbarView from './NavbarView';

import categories from '../../models/categories';

export default class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {categories:[], user: false, userStore: props.userStore};
  }

  componentDidMount() {
    this._catSub = categories.subscribe(({state}) => {
      this.setState({categories: state.categories || []});
    });

    if (this.props.userStore) {
      this._userSub = this.props.userStore.subscribe(({state}) => {
        this.setState({user: state.user || false});
      });
    }
  }

  componentWillUnmount(){
    if (this._catSub) this._catSub.unsubscribe();
    if (this._userSub) this._userSub.unsubscribe();
  }

  gotoCategory({title}) {
    console.log('go to category', title);
  }

  render() {
    const props = { ...this.props };
    delete props.children;
    return (
      <NavbarView {...this.state} gotoCategory={(name) => this.gotoCategory(name)}>
      </NavbarView>
    );
  }
}
