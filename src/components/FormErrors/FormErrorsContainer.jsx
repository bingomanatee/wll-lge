import React, { Component } from 'react';
import _ from 'lodash';
import {FormError} from '../../style';

export default class FormErrorsContainer extends Component {
  constructor(props) {
    super(props);
  }

  setFormErrorsFoo(value) {
    return this.setState({ formErrorsFoo: value });
  }

  render() {
    const {field, errors, level } = { ...this.props };
    let error = _.get(errors, field, false);
    if (_.isArray(error)){
      error =
        (
          <tr>
            <th>&nbsp;</th>
            <td>{error.map(msg => <FormError level={level || 'error'} key={msg}>{field}: {msg}</FormError>)}</td>
          </tr>
        );
    }

    return error || false;
  }
}
