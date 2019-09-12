import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const FormWrapper = ({ children, onSubmit, ...remainingProps }) => (
  <View {...remainingProps}>
    {children(onSubmit)}
  </View>
);

FormWrapper.propTypes = {
  children: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default FormWrapper;