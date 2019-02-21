import React, { Component } from 'react';
import CategoryEditView from './CategoryEditView';

export default class CategoryEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = CategoryEditContainer.getDerivedStateFromProps(props, { categoryEditFoo: 1 });
  }

  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  setCategoryEditFoo(value) {
    return this.setState({ categoryEditFoo: value });
  }

  render() {
    const props = { ...this.props };
    const children = props.children;
    delete props.children;
    return (
      <CategoryEditView {...props} {...this.state} setCategoryEditFoo={value => this.setCategoryEditFoo(value)}>
        {children}
      </CategoryEditView>
    );
  }
}
