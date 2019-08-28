import React, { useState, useMemo, useCallback, useEffect } from 'react';

import transposeKeys from './transposeKeys';

export const FormContext = React.createContext();

const Form = ({ 
  onSubmit, 
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

      console.log(errors);

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

    Object
      .keys(rawValues)
      .forEach(k => rawValues[k] === undefined && delete rawValues[k]);

    const values = transposeKeys(rawValues);

    onSubmit({ formValid, values });
  },[form]);

  useEffect(() => {
    if (onChangeFormValid) {
      onChangeFormValid(form.formValid);
    }
  }, [form.formValid]);

  return (
    <FormContext.Provider value={ctx}>
      <form onSubmit={handleOnSubmit} {...remainingProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;