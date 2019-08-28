import React, { useEffect, useContext, useCallback, useState } from 'react';

import { FormContext } from './Form';

const withFormHandling = (FormInput, onFormValueChange=v => v) => ({
  name,
  defaultValue='',
  ...remainingProps
}) => {
  const { 
    values, setValue,
    errors, setError,
  } = useContext(FormContext);

  const setNamedValue = useCallback((value) => {
    let processedValue = value;
    try {
      processedValue = onFormValueChange(value, remainingProps);  
      setError(name, null);
    } catch (e) {
      const message = e.displayText || e;
      setError(name, message);
    }
    setValue(name, processedValue);
  }, [name]);

  useEffect(() => {
    setNamedValue(defaultValue);
  }, [name, defaultValue]);

  return (
    <FormInput 
      value={values[name] || ''}
      error={errors[name] || null}
      setValue={setNamedValue}
      name={name}
      {...remainingProps} 
    />
  );
};

export default withFormHandling;