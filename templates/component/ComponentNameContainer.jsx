import React, { Component } from 'react';
import ComponentNameView from './ComponentNameView';

export default class ComponentNameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = ComponentNameContainer.getDerivedStateFromProps(props, { componentNameFoo: 1 });
  }

  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  setComponentNameFoo(value) {
    return this.setState({ componentNameFoo: value });
  }

  render() {
    const props = { ...this.props };
    const children = props.children;
    delete props.children;
    return (
      <ComponentNameView {...props} {...this.state} setComponentNameFoo={value => this.setComponentNameFoo(value)}>
        {children}
      </ComponentNameView>
    );
  }
}
