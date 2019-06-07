import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext();

class Form extends Component {
  state = {
    formValues: {},
    formDefaultValues: {},
    formValidity: {},
    formDefaultValidity: {},
    handleValid: ({ name, valid }) => {
      const { onFormValidityChange } = this.props;
      const { formValidity: oldValidity } = this.state;
  
      const formValidity = { ...oldValidity, [name]: valid };
  
      onFormValidityChange(formValidity);
      this.setState({ formValidity });
    },
    handleValue: ({ name, value }) => {
      const { onFormValuesChange } = this.props;
      const { formValues: oldValues } = this.state;
  
      const formValues = { ...oldValues, [name]: value };
  
      onFormValuesChange(formValues);
      this.setState({ formValues });
    },
  };

  componentWillReceiveProps(nextProps) {
    const { defaultValues: prevDefaults } = this.props;
    const { formValues: oldValues, formValidity: oldValidity } = this.state;
    const { defaultValues: nextDefaults } = nextProps;

    if (prevDefaults !== nextDefaults) {
      const formValues = { ...oldValues, ...nextDefaults };
      const formValidity = { ...oldValidity };

      Object.entries(nextDefaults).forEach(([key,value]) => {
        if (value) {
          formValidity[key] = true;
        }
      });
      this.setState({ formValues, formValidity });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <FormContext.Provider value={this.state}>
        {children}
      </FormContext.Provider>
    )
  }
}

Form.propTypes = {
  children: PropTypes.node,
  onFormValuesChange: PropTypes.func,
  onFormValidityChange: PropTypes.func,
  defaultValues: PropTypes.shape({})
};

Form.defaultProps = {
  onFormValuesChange: () => {},
  onFormValidityChange: () => {},
};

export default Form;