import React, { useEffect, useContext, useCallback, useRef } from 'react';

import FormContext from './FormContext';
import useFormField from './useFormField';

const withFormHandling = (FormInput, onFormChange = () => {}) => ({
  name,
  defaultValue = '',
  ...remainingProps
}) => {
  const { inputProps } = useContext(FormContext);
  const remainingPropsRef = useRef(remainingProps);
  remainingPropsRef.current = remainingProps;

  const computeError = useCallback(
    (val) => {
      try {
        if (typeof onFormChange === 'function') {
          onFormChange(val, remainingPropsRef.current);
        } else if (Array.isArray(onFormChange)) {
          onFormChange.forEach((cb) => cb(val, remainingPropsRef.current));
        }
        return null;
      } catch (e) {
        const message = e.displayText || e;
        return message;
      }
    },
    [remainingPropsRef]
  );

  const { value, error, key, setValue, setError } = useFormField(name, {
    registerInput: true,
    defaultValue,
    initialError: computeError(defaultValue)
  });

  useEffect(() => {
    const currentError = computeError(value);
    setError(currentError);
  }, [computeError, value, setError]);

  return (
    <FormInput
      value={value}
      error={error}
      setError={setError}
      setValue={setValue}
      name={name}
      inputProps={inputProps}
      {...remainingProps}
      key={key}
    />
  );
};

export default withFormHandling;
