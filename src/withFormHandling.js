import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from './Form';

const withFormHandling = (FormInput) => {
  class WrappedComponent extends Component {
    static contextType = FormContext;

    componentDidMount() {
      const { defaultValue, defaultValidity, optional } = this.props;

      const value = defaultValue || '';
      const valid = defaultValidity || optional;

      this.setFormInputValue(value);
      this.setFormInputValidity(valid);
    }

    componentWillReceiveProps(nextProps) {
      const { defaultValue: oldValue, defaultValidity: oldValidity } = this.props;
      const { defaultValue: newValue, defaultValidity: newValidity } = nextProps;

      if (oldValue !== newValue) {
        this.setFormInputValue(newValue);
      }

      if (oldValidity !== newValidity) {
        this.setFormInputValidity(newValidity);
      }
    }

    setFormInputValue = (value) => {
      const { name } = this.props;
      const { handleValue } = this.context;
      handleValue({ name, value });
    }

    setFormInputValidity = (valid) => {
      const { name } = this.props;
      const { handleValid } = this.context;
      handleValid({ name, valid });
    }

    render() {
      const { name, ...props } = this.props;

      return (
        <FormContext.Consumer>
          {
            context =>(
              <FormInput
                name={name}
                setFormInputValue={this.setFormInputValue}
                setFormInputValidity={this.setFormInputValidity}
                value={context.formValues[name] || ''}
                valid={context.formValidity[name]}
                {...props}
              />
            )
          }
        </FormContext.Consumer>
      );
    }
  }

  WrappedComponent.propTypes = {
    name: PropTypes.string,
    optional: PropTypes.bool,
    defaultValue: PropTypes.string,
    defaultValidity: PropTypes.bool,
  };

  WrappedComponent.defaultProps = {
    optional: false,
  };

  return WrappedComponent;
}

export default withFormHandling;