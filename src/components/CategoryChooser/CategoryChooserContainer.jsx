import React, {Component} from 'react';
import _ from 'lodash';

import CategoryChooserView from './CategoryChooserView';

import categoryStore from '../../models/categories';

export default class CategoryChooserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {value: _.get(props, 'value', ''), categories: []};
  }

  componentDidMount() {
    this._mounted = true;
    this._cSub = categoryStore.subscribe(({state}) => {
      this._digestCatState(state);
    });
  }

  componentWillUnmount() {
    if (this._cSub) {
      this._cSub.unsubscribe();
    }
    this._mounted = false;
  }

  _digestCatState(state) {
    let categories = _.get(state, 'categories', []);
    if (categories.length){
      if (this.state.value){
        this.setState({categories});
      } else {
        const value = categories[0].directory;
        this.setState({categories, value}, () => {
          this.onChange(value);
        });
      }

    }
  }

  onChange(value) {
    this.setState({value});
    if (this.props.onChange) {
      console.log('setting category to ', value);
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <CategoryChooserView {...this.state} onChange={(value) => this.onChange(value)}>
      </CategoryChooserView>
    );
  }
}
