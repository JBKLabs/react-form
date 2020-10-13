import React, { useEffect, useLayoutEffect, useContext, useCallback, useState, useRef } from 'react';

import FormContext from './FormContext';
import useFormField from './useFormField';

const withFormHandling = (FormInput, onFormChange = () => { }) => ({
  name,
  defaultValue = '',
  ...remainingProps
}) => {
  const {
    setValue,
    setError,
    inputProps,
    addKey,
    removeKey
  } = useContext(FormContext);
  const remainingPropsRef = useRef(remainingProps);
  remainingPropsRef.current = remainingProps;

  const computeError = useCallback((v) => {
    try {
      if (typeof onFormChange === 'function') {
        onFormChange(v, remainingPropsRef.current);
      } else if (Array.isArray(onFormChange)) {
        onFormChange.forEach(cb => cb(v, remainingPropsRef.current));
      }
      return null;
    } catch (e) {
      const message = e.displayText || e;
      return message;
    }
  }, [onFormChange, remainingPropsRef]);
  
  useLayoutEffect(() => {
    const defaultError = computeError(defaultValue);
    addKey(name, defaultValue, defaultError);
    return () => removeKey(name);
  }, [name, defaultValue, addKey, removeKey, computeError]);

  const { value, error, key } = useFormField(name);

  useEffect(() => {
    const currentError = computeError(value);
    setError(name, currentError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, value, inputProps, setError]);

  const setNamedValue = useCallback(
    (nextValue) => {
      setValue(name, nextValue);
    },
    [name, setValue]
  );

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
