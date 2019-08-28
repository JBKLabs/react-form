import React from 'react';
import { withFormHandling, ValidationError } from '@jbk/react-form';

const Input = ({
  value,
  setValue,
  error,
  ...remainingProps
}) => {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        {...remainingProps} 
      />
      {error && (
        <div style={{ color: 'red' }}>{error}</div>
      )}
    </>
  );
}

const onFormValueChange = (value, { regex }) => {
  if (regex && !value.match(regex)) {
    throw new ValidationError('Invalid pattern.')
  } else if (!regex && value !== 'hello') {
    throw new ValidationError('Too Rude.');
  }
  return value;
}

export default withFormHandling(Input, onFormValueChange);