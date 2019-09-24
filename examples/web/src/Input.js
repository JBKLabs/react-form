import React from 'react';
import { withFormHandling, ValidationError } from '@jbknowledge/react-form';

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

const onFormValueChange = (value, { name, regex }) => {
  if (regex && !value.match(regex)) {
    throw new ValidationError('Invalid pattern.')
  } else if (!regex && value === 'hell') {
    throw new ValidationError('HEY!');
  } else if (!regex && value !== 'hello') {
    throw new ValidationError('Too Rude.');
  }
}

export default withFormHandling(Input, onFormValueChange);