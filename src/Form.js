import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext();

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {},
      formDefaultValues: {},
      formValidity: {},
      formDefaultValidity: {},
      handleValid: ({ name, valid }) => {
        const { formValidity: oldValidity } = this.state;
        const formValidity = { ...oldValidity, [name]: valid };
        this.formValidityHandler(formValidity);
      },
      handleValue: ({ name, value }) => {
        const { formValues: oldValues } = this.state;
        const formValues = { ...oldValues, [name]: value };
        this.formValuesHandler(formValues);
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValues: prevDefaults } = this.props;
    const { formValues: oldValues, formValidity: oldValidity } = this.state;
    const { defaultValues: nextDefaults } = nextProps;

    if (prevDefaults !== nextDefaults) {
      const formValues = { ...oldValues };
      const formValidity = { ...oldValidity };

      Object.entries(nextDefaults).forEach(([key,value]) => {
        if (typeof value === 'object') {
          const [_value, _valid] = value;
          formValues[key] = _value;
          formValidity[key] = _valid;
        } else {
          formValues[key] = value;
          formValidity[key] = true;
        }      
      });
      this.formValuesHandler(formValues);
      this.formValidityHandler(formValidity);
    }
  }

  formValuesHandler = (formValues) => {
    const { onFormValuesChange } = this.props;
    this.setState({ formValues }, () => onFormValuesChange(formValues));
  }

  formValidityHandler = (formValidity) => {
    const { onFormValidityChange } = this.props;
    const formValid = Object
      .values(formValidity)
      .reduce((cur, next) => cur && next, true);

    const numFields = Object.keys(formValidity).length;

    this.setState({ formValidity }, () => onFormValidityChange({
      fields: formValidity,
      valid: formValid,
      count: numFields,
    }));
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