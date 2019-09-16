import React, { useEffect, useContext, useCallback } from 'react';

import FormContext from './FormContext';

const withFormHandling = (
  FormInput, 
  onFormChange=() => {},
) => ({
  name,
  defaultValue='',
  ...remainingProps
}) => {
  const { 
    values, setValue,
    errors, setError,
    setDefault,
    removeKey,
  } = useContext(FormContext);

  const value = values[name] || '';
  const error = errors[name] || null;

  const setNamedValue = useCallback((value) => {
    setValue(name, value);
  }, [name]);

  useEffect(() => {
    setDefault(name, defaultValue);
    return () => removeKey(name);
  },[name, defaultValue]);

  useEffect(() => {
    try {
      onFormChange(value, remainingProps);  
      setError(name, null);
    } catch (e) {
      const message = e.displayText || e;
      setError(name, message);
    }
  }, [value])

  return (
    <FormInput 
      value={value}
      error={error}
      setValue={setNamedValue}
      name={name}
      {...remainingProps} 
    />
  );
};

export default withFormHandling;