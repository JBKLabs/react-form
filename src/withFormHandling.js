import React, { useEffect, useContext, useCallback, useState } from 'react';

import { FormContext } from './Form';

const withFormHandling = (FormInput, onFormValueChange=v => v) => ({
  name,
  defaultValue='',
  ...remainingProps
}) => {
  const [updated, setUpdated] = useState(false);
  const { 
    values, setValue,
    errors, setError,
  } = useContext(FormContext);

  const setNamedValue = useCallback((value) => {
    if (!updated) {
      setUpdated(true);
    }

    let processedValue = value;
    try {
      processedValue = onFormValueChange(value, remainingProps);  
      setError(name, null);
    } catch (e) {
      const message = e.displayText || e;
      setError(name, message);
    }
    setValue(name, processedValue);
  }, [name, updated]);

  useEffect(() => {
    setValue(name, defaultValue);
  }, [name, defaultValue]);

  return (
    <FormInput 
      value={values[name] || ''}
      error={updated ? errors[name] : null}
      setValue={setNamedValue}
      name={name}
      {...remainingProps} 
    />
  );
};

export default withFormHandling;