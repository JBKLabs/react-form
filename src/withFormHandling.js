import React, { useEffect, useContext, useCallback, useRef, useState } from 'react';

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

  const validateValue = useCallback((value) => {
    if (typeof onFormChange === 'function') {
      onFormChange(value, remainingPropsRef.current);
    } else if (Array.isArray(onFormChange)) {
      onFormChange.forEach((cb) => cb(value, remainingPropsRef.current));
    }
  }, [remainingPropsRef, onFormChange]);


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
