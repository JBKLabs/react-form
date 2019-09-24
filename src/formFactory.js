import React, { useMemo, useCallback, useEffect } from 'react';

import { transposeKeys, useFormReducer, globMatch } from './util';
import FormContext from './FormContext';

const formFactory = (FormWrapper) => {
  const Form = ({ onSubmit, onChange, children, ...remainingProps }) => {
    const [form, dispatch] = useFormReducer();

    const updateSubscribers = useCallback(
      (callback) => {
        const transposedValues = transposeKeys(form.values);

        const resetInputs = (patterns = ['*']) => {
          const names = globMatch(patterns, Object.keys(form.values));
          dispatch.resetNamedInputs({ names });
        };

        callback({
          formValid: form.formValid,
          values: transposedValues,
          resetInputs
        });
      },
      [dispatch, form.values, form.formValid]
    );

    const handleOnSubmit = useCallback(
      (e) => {
        e.preventDefault();
        updateSubscribers(onSubmit);
      },
      [updateSubscribers, onSubmit]
    );

    const handleOnChange = useCallback(() => updateSubscribers(onChange), [
      onChange,
      updateSubscribers
    ]);

    const handlers = useMemo(
      () => ({
        setValue: (name, value) => dispatch.setValue({ name, value }),
        setError: (name, error) => dispatch.setError({ name, error }),
        setDefault: (name, defaultValue) =>
          dispatch.setDefault({ name, defaultValue }),
        removeKey: (name) => dispatch.removeKey({ name })
      }),
      [dispatch]
    );

    const ctx = useMemo(
      () => ({
        values: form.values,
        errors: form.errors,
        keys: form.keys,
        ...handlers
      }),
      [form.errors, form.values, form.keys, handlers]
    );

    useEffect(() => {
      if (form.triggerOnChange) {
        handleOnChange();
        dispatch.unset({ trigger: 'triggerOnChange' });
      }
    }, [dispatch, form.triggerOnChange, handleOnChange]);

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
    onChange: () => {}
  };

  return Form;
};

export default formFactory;
