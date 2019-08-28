import React, { useState, useMemo, useCallback } from 'react';

export const FormContext = React.createContext();

const Form = ({ onSubmit, children }) => {
  const [form, setForm] = useState({
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
    setError: (name, error) => setForm(prev => ({
      ...prev, 
      errors: { 
        ...prev.errors, 
        [name]: error 
      } 
    })),
  }), [form]);

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(form);
  },[form]);

  return (
    <FormContext.Provider value={ctx}>
      <form onSubmit={handleOnSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;