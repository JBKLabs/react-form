import React, { useMemo, useCallback, useEffect } from 'react';

import { transposeKeys, useFormReducer, globMatch } from './util';
import FormContext from './FormContext';

const formFactory = (FormWrapper) => {
  const Form = ({ 
    onSubmit,
    onChange,
    children, 
    ...remainingProps
  }) => {
    const [form, dispatch] = useFormReducer();

    const updateSubscribers = useCallback((callback) => {
      const { values, defaults, formValid } = form;
      const transposedValues = transposeKeys(values);

      const resetInputs = (patterns = ['*']) => {
        const keys = globMatch(patterns, Object.keys(values));
        const changes = keys.reduce((obj, k) => ({ ...obj, [k]: defaults[k] }), {});
        dispatch.setMany({ changes });
      }

      callback({ formValid, values: transposedValues, resetInputs });
    },[form, dispatch]);

    const handleOnSubmit = (e) => {
      e.preventDefault();
      updateSubscribers(onSubmit);
    }
    const handleOnChange = () => updateSubscribers(onChange);

    const ctx = useMemo(() => ({
      values: form.values,
      errors: form.errors,
      setValue: (name, value) => dispatch.setValue({ name, value }),
      setError: (name, error) => dispatch.setError({ name, error }),
      setDefault: (name, defaultValue) => dispatch.setDefault({ name, defaultValue }),
      removeKey: (name) => dispatch.removeKey({ name }),
    }), [form]);
  
    useEffect(() => {
      if (form.triggerOnChange) {
        handleOnChange();
        dispatch.unset({ trigger: 'triggerOnChange' });
      }
    },[form.triggerOnChange])

    return (
      <FormContext.Provider value={ctx}>
        <FormWrapper onSubmit={handleOnSubmit} {...remainingProps}>
          {children}
        </FormWrapper>
      </FormContext.Provider>
    );
  };

  Form.defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
  };

  return Form;
}

export default formFactory;