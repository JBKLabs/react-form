import React, { useState } from 'react';
import { withFormHandling, ValidationError } from '@jbk/react-form';

const Input = ({ value, setValue, error, ...remainingProps }) => {
  const [blurred, setBlurred] = useState(false);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setBlurred(true)}
        {...remainingProps}
      />
      {error && blurred && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
};

const onFormValueChange = (value, { regex }) => {
  if (regex && !value.match(regex)) {
    throw new ValidationError('Invalid pattern.');
  } else if (!regex && value === 'hell') {
    throw new ValidationError('HEY!');
  } else if (!regex && value !== 'hello') {
    throw new ValidationError('Too Rude.');
  }
};

export default withFormHandling(Input, onFormValueChange);
