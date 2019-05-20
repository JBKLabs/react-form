import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FormContext = React.createContext();

class Form extends Component {
  state = {
    formValues: {},
  };

  handleValue = ({ name, value }) => {
    const { onFormValuesChange } = this.props;
    const { formValues: oldValues } = this.state;

    const formValues = { ...oldValues, [name]: value };

    if (onFormValuesChange) {
      onFormValuesChange(formValues);
    }

    this.setState({ formValues });
  }

  render() {
    const { children } = this.props;
    const { formValues } = this.state;

    return (
      <FormContext.Provider
        value={{ 
          formValues,
          handleValue: this.handleValue,
        }}
      >
        {children}
      </FormContext.Provider>
    )
  }
}

Form.propTypes = {
  children: PropTypes.node,
  onFormValuesChange: PropTypes.func,
};

Form.defaultProps = {
  onFormValuesChange: () => {},
};

const withFormHandling = (FormInput) => {
  const WrappedComponent = ({ name, ...props }) => (
    <FormContext.Consumer>
      {
        context => (
          <FormInput
            {...props}
            name={name}
            setFormInputValue={value => context.handleValue({ name, value })}
            value={context.formValues[name] || ''}
          />
        )
      }
    </FormContext.Consumer>
  );

  WrappedComponent.propTypes = {
    name: PropTypes.string,
  }

  return WrappedComponent;
}

export {
  Form,
  withFormHandling,
};