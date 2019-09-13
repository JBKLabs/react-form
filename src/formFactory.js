import React, { useState, useMemo, useCallback, useEffect } from 'react';

import transposeKeys from './transposeKeys';
import FormContext from './FormContext';

const cleanFormValues = (values) => {
  const cleanedValues = Object
    .keys(values)
    .filter(k => values[k] !== undefined)
    .reduce((obj, key) => ({ ...obj, [key]: values[key]}), {});

  return transposeKeys(cleanedValues);
};

const formFactory = (FormWrapper) => ({ 
  onSubmit,
  onChange,
  children, 
  onChangeFormValid,
  ...remainingProps
}) => {
  const [form, setForm] = useState({
    formValid: false,
    values: {},
    errors: {},
  });

  const ctx = useMemo(() => ({
    values: form.values,
    errors: form.errors,
    setValue: (name, value) => setForm(prev => ({
      ...prev, 
      values: { 
        ...prev.values, 
        [name]: value 
      } 
    })),
    setError: (name, error) => setForm(prev => {
      const values = prev.values;
      const errors = {
        ...prev.errors,
        [name]: error
      };
      const formValid = Object
        .values(errors)
        .filter(v => v !== undefined)
        .reduce((valid, nextError) => valid && nextError === null, true);

      return {
        values,
        errors,
        formValid
      };
    }),
  }), [form]);

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault();
    const { formValid, values: rawValues } = form;
    const values = cleanFormValues(rawValues);
    onSubmit({ formValid, values });
  },[form]);

  useEffect(() => {
    if (onChangeFormValid) {
      onChangeFormValid(form.formValid);
    }
  }, [form.formValid]);

  useEffect(() => {
    if (onChange) {
      const values = cleanFormValues(form.values);
      onChange(values);
    }
  }, [form.values]);

  return (
    <FormContext.Provider value={ctx}>
      <FormWrapper onSubmit={handleOnSubmit} {...remainingProps}>
        {children}
      </FormWrapper>
    </FormContext.Provider>
  );
};

export default formFactory;