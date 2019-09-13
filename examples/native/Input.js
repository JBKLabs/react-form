import React from 'react';
import { TextInput } from 'react-native';
import { withFormHandling } from '@jbk/react-form/native';

const Input = ({
  value,
  setValue,
}) => (
  <TextInput
    onChangeText={setValue}
    value={value}
  />
);

export default withFormHandling(Input);