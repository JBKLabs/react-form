import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';

import { withFormHandling } from './Form';

class TextInput extends Component {
  render() {
    const { value, setFormInputValue, ...props } = this.props;

    return (
      <Input 
        {...props}
        value={value}
        onChangeText={setFormInputValue}
      />
    );
  }
};

TextInput.propTypes = {
  value: PropTypes.string,
  setFormInputValue: PropTypes.func,
};

export default withFormHandling(TextInput);