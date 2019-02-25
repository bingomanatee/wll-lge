import React, { Component } from 'react';
import _ from 'lodash';

export default class FormErrorsContainer extends Component {
  constructor(props) {
    super(props);
  }

  setFormErrorsFoo(value) {
    return this.setState({ formErrorsFoo: value });
  }

  render() {
    const {field, errors } = { ...this.props };
    let error = _.get(errors, field, false);
    console.log('field: ', field, 'error:', error);
    if (_.isArray(error)){
      error =
        (
          <tr>
            <td>&nbsp;</td>
            <td>{error.map(msg => <p key={msg}>{field}: {msg}</p>)}</td>
          </tr>
        );
    }

    return error || false;
  }
}
