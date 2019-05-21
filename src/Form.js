import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext();

class Form extends Component {
  handleValue = ({ name, value }) => {
    const { onFormValuesChange } = this.props;
    const { formValues: oldValues } = this.state;

    const formValues = { ...oldValues, [name]: value };

    onFormValuesChange(formValues);
    this.setState({ formValues });
  }

  handleValid = ({ name, valid }) => {
    const { onFormValidityChange } = this.props;
    const { formValidity: oldValidity } = this.state;

    const formValidity = { ...oldValidity, [name]: valid };

    onFormValidityChange(formValidity);
    this.setState({ formValidity });
  }

  state = {
    formValues: {},
    formValidity: {},
    handleValid: this.handleValid,
    handleValue: this.handleValue,
  };

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
};

Form.defaultProps = {
  onFormValuesChange: () => {},
  onFormValidityChange: () => {},
};

export default Form;