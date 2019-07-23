import React from 'react';
import { TextInput } from 'react-native';
import { withFormHandling } from '@jbk/react-form';

const Input = ({
  value, setFormInputValue, ...remainingProps
}) => {
  return (
    <TextInput 
      value={value}
      onChangeText={setFormInputValue}
      {...remainingProps}
    />
  );
};

export default withFormHandling(Input);
