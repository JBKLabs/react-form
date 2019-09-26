import React, { useEffect, useContext, useCallback } from 'react';

import FormContext from './FormContext';

const withFormHandling = (FormInput, onFormChange = () => { }) => ({
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
      if (typeof onFormChange === 'function') {
        onFormChange(value, remainingProps);
      } else if (Array.isArray(onFormChange)) {
        onFormChange.forEach(cb => cb(value, remainingProps));
      }
      setError(name, null);
    } catch (e) {
      const message = e.displayText || e;
      setError(name, message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FormInput
      value={value}
      error={error}
      setValue={setNamedValue}
      name={name}
      {...remainingProps}
      key={key}
    />
  );
};

export default withFormHandling;
