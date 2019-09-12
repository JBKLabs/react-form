import React from 'react';
import { TextInput } from 'react-native';
import { withFormHandling } from '@jbk/react-form';

const Input = ({
  value,
  setValue,
}) => (
  <TextInput
    style={{ height: 40, borderColor: 'black' }}
    onChangeText={setValue}
    value={value}
  />
);

const onFormChange = () => {};

export default withFormHandling(Input, onFormChange);