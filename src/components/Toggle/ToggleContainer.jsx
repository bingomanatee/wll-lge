import React, { Component } from 'react';
import ToggleView from './ToggleView';

export default class ToggleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  render() {
    return (
      <ToggleView {...this.state}>
      </ToggleView>
    );
  }
}
