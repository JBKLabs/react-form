import React, { useEffect, useContext, useCallback } from 'react';

import FormContext from './FormContext';

const withFormHandling = (FormInput, onFormChange = () => {}) => ({
  name,
  defaultValue = '',
  ...remainingProps
}) => {
  const {
    values,
    setValue,
    errors,
    setError,
    keys,
    inputProps,
    setDefault,
    removeKey
  } = useContext(FormContext);

  const value = values[name] || '';
  const error = errors[name] || null;
  const key = keys[name] || name;

  const setNamedValue = useCallback(
    (nextValue) => {
      setValue(name, nextValue);
    },
    [name, setValue]
  );

  useEffect(() => {
    setDefault(name, defaultValue);
    return () => removeKey(name);
  }, [name, defaultValue, setDefault, removeKey]);

  useEffect(() => {
    try {
      onFormChange(value, remainingProps);
      if (error !== null) {
        setError(name, null);
      }
    } catch (e) {
      const message = e.displayText || e;
      if (error !== message) {
        setError(name, message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FormInput
      value={value}
      error={error}
      setValue={setNamedValue}
      name={name}
      inputProps={inputProps}
      {...remainingProps}
      key={key}
    />
  );
};

export default withFormHandling;
