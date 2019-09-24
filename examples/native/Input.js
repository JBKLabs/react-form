import React from 'react';
import { TextInput } from 'react-native';
import { withFormHandling } from '@jbknowledge/react-form/native';

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