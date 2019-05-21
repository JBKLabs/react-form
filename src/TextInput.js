import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';

import withFormHandling from './withFormHandling';

class TextInput extends Component {
  state = {
    error: null,
    lastValidatedValue: '',
  }

  componentWillReceiveProps(nextProps) {
    const { lastValidatedValue } = this.state;
    const { value } = nextProps;

    if (lastValidatedValue !== value) {
      this.handleValid(value);
    }
  }

  handleValid = (value) => {
    const { 
      setFormInputValidity, regex, defaultErrorMessage,
      customValidation, optional
    } = this.props;

    const lastValidatedValue = value;

    try {
      const isErroneouslyNull = !optional ? value === '' : false;
      const validationPasses = customValidation
        ? customValidation(value)
        : new RegExp(regex).test(value);

      const relevantErrorMessage = isErroneouslyNull ? 'Required.' : defaultErrorMessage;
      const valid = validationPasses && !isErroneouslyNull;
      const error = !valid ? relevantErrorMessage : null;

      this.setState({ error, lastValidatedValue });
      setFormInputValidity(valid);
    } catch(e) {
      const error = e.displayText || 'Something went horribly wrong.';
      this.setState({ error, lastValidatedValue });
      setFormInputValidity(false);
    }
  }

  computeStyles = (style) => {
    return typeof style === 'function'
      ? style(this.props)
      : style;
  }

  render() {
    const { 
      value, containerStyle, inputContainerStyle, errorStyle, 
      inputStyle, labelStyle, leftIconContainerStyle, style,
      rightIconContainerStyle, valid, setFormInputValue, ...props
    } = this.props;
    const { error } = this.state;

    return (
      <Input 
        value={value}
        onChangeText={setFormInputValue}
        errorMessage={error || ' '}
        containerStyle={this.computeStyles(containerStyle)}
        inputContainerStyle={this.computeStyles(inputContainerStyle)}
        errorStyle={this.computeStyles(errorStyle)}
        inputStyle={this.computeStyles(inputStyle)}
        labelStyle={this.computeStyles(labelStyle)}
        leftIconContainerStyle={this.computeStyles(leftIconContainerStyle)}
        style={this.computeStyles(style)}
        rightIconContainerStyle={this.computeStyles(rightIconContainerStyle)}
        {...props}
      />
    );
  }
};

TextInput.propTypes = {
  optional: PropTypes.bool,
  regex: PropTypes.string,
  value: PropTypes.string,
  valid: PropTypes.bool,
  setFormInputValue: PropTypes.func,
  setFormInputValidity: PropTypes.func,
  customValidation: PropTypes.func,
  defaultErrorMessage: PropTypes.string,
  containerStyle: PropTypes.oneOfType(PropTypes.shape({}), PropTypes.func),
};

TextInput.defaultProps = {
  regex: '(.*?)',
};

export default withFormHandling(TextInput);