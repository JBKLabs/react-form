import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formFactory = (Provider) => {
  class Form extends Component {
    state = {
      formValues: {},
    };

    handleValue = ({ name, value }) => {
      const { formValues: oldValues } = this.state;

      const formValues = { ...oldValues, [name]: value };

      console.log(formValues);
      this.setState({ formValues });
    }

    render() {
      const { children } = this.props;
      const { formValues } = this.state;

      return (
        <Provider
          value={{ 
            formValues,
            handleValue: this.handleValue,
          }}
        >
          {children}
        </Provider>
      )
    }
  }

  Form.propTypes = {
    children: PropTypes.node,
  }
}

export default formFactory;