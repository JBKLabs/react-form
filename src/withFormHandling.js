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
      const { 
        name, value: injectedValue, valid: injectedValid, 
        setFormInputValue: injectedValueChange, 
        setFormInputValidity: injectedValidityChange, 
        ...remaining 
      } = this.props;
      
      return this.context
        ? (
          <FormInput
            name={name}
            setFormInputValue={this.setFormInputValue}
            setFormInputValidity={this.setFormInputValidity}
            value={this.context.formValues[name]}
            valid={this.context.formValidity[name]}
            {...remaining}
          />
        ) : (
          <FormInput
            name={name}
            setFormInputValue={injectedValueChange}
            setFormInputValidity={injectedValidityChange}
            value={injectedValue}
            valid={injectedValid}
            {...remaining}
          />
        )
    }
  }

  WrappedComponent.propTypes = {
    name: PropTypes.string,
    optional: PropTypes.bool,
    value: PropTypes.any,
    valid: PropTypes.bool,
    setFormInputValue: PropTypes.func,
    setFormInputValidity: PropTypes.func,
  };

  WrappedComponent.defaultProps = {
    optional: false,
    value: '',
    valid: true,
    setFormInputValue: () => {},
    setFormInputValidity: () => {},
  };

  return WrappedComponent;
}

export default withFormHandling;