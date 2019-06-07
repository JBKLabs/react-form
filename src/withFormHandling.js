import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from './Form';

const withFormHandling = (FormInput) => {
  class WrappedComponent extends Component {
    static contextType = FormContext;

    setFormInputValue = value => {
      const { name } = this.props;
      const { handleValue } = this.context;
      handleValue({ name, value });
    }

    setFormInputValidity = valid => {
      const { name } = this.props;
      const { handleValid } = this.context;
      handleValid({ name, valid });
    }

    render() {
      const { name, ...remaining } = this.props;
      const { formValidity, formValues } = this.context;

      return (
        <FormInput
          name={name}
          setFormInputValue={this.setFormInputValue}
          setFormInputValidity={this.setFormInputValidity}
          value={formValues[name]}
          valid={formValidity[name]}
          {...remaining}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    name: PropTypes.string,
    optional: PropTypes.bool,
  };

  WrappedComponent.defaultProps = {
    optional: false,
  };

  return WrappedComponent;
}

export default withFormHandling;