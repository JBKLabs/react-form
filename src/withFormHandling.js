import React, { useCallback, useRef } from 'react';

import useFormField from './useFormField';
import useFormContext from './useFormContext';

const withFormHandling = (FormInput, onFormChange = () => {}) => ({
  name,
  defaultValue = '',
  ...remainingProps
}) => {
  const { inputProps, getField } = useFormContext();
  const remainingPropsRef = useRef(remainingProps);
  remainingPropsRef.current = remainingProps;

  const getFormField = useCallback((name) => {
    const { value, error } = getField(name);
    return { value, error };
  }, [getField]);

  const validateValue = useCallback(
    (value) => {
      if (typeof onFormChange === 'function') {
        onFormChange(value, remainingPropsRef.current, getFormField);
      } else if (Array.isArray(onFormChange)) {
        onFormChange.forEach((cb) => cb(value, remainingPropsRef.current, getFormField));
      }
    },
    [remainingPropsRef, getFormField]
  );

  const field = useFormField(name, { defaultValue, validateValue });

  return (
    <FormInput
      key={field.key}
      value={field.value}
      error={field.error}
      setValue={field.setValue}
      name={name}
      inputProps={inputProps}
      {...remainingProps}
    />
  );
};

export default withFormHandling;
