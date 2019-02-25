import React, { Component } from 'react';
import _ from 'lodash';

import CategoryChooserView from './CategoryChooserView';

import categoryStore from '../../models/categories';

export default class CategoryChooserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {value : '', categories: []};
  }

  componentDidMount() {
    this._mounted = true;
    this._cSub = categoryStore.subscribe(({state}) => {
      this._digestCatState(state);
    });
  }

  componentWillUnmount() {
    if (this._cSub) this._cSub.unsubscribe();
    this._mounted = false;
  }

  _digestCatState(state){
    let categories = _.get(state, 'categories', []);
    this.setState({categories});
  }

  onChange(value) {
    console.log('selected: ', value);
  }

  render() {
    return (
      <CategoryChooserView {...this.state} onChange={(value) => this.onChange(value)}>
      </CategoryChooserView>
    );
  }
}
