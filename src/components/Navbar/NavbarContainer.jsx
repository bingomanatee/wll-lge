import React, { Component } from 'react';
import NavbarView from './NavbarView';

import categories from '../../models/categories';

export default class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {categories:[]};
  }

  componentDidMount() {
    this._catSub = categories.subscribe(({state}) => {
      this.setState({categories: state.categories || []});
    });
  }

  componentWillUnmount(){
    if (this._catSub) this._catSub.unsubscribe();
  }

  gotoCategory({title}) {
    console.log('go to category', title);
  }

  render() {
    const props = { ...this.props };
    const children = props.children;
    delete props.children;
    return (
      <NavbarView {...props} {...this.state} gotoCategory={(name) => this.gotoCategory(name)}>
        {children}
      </NavbarView>
    );
  }
}
