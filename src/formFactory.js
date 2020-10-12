import React, { useMemo, useCallback, useEffect, useRef } from 'react';

import { transposeKeys, useFormReducer, globMatch } from './util';
import FormContext from './FormContext';

const formFactory = (FormWrapper) => {
  const Form = ({ onSubmit, onChange, inputProps, children, ...remainingProps }) => {
    const formValues = useRef({});
    const formValid = useRef(false);
    const [form, dispatch] = useFormReducer();
    formValues.current = form.values;
    formValid.current = form.formValid;

    const updateSubscribers = useCallback(
      (callback) => {
        const transposedValues = transposeKeys(formValues.current);

        const resetInputs = (patterns = ['*']) => {
          const names = globMatch(patterns, Object.keys(formValues.current));
          dispatch.resetNamedInputs({ names });
        };

        callback({
          formValid: formValid.current,
          values: transposedValues,
          resetInputs
        });
      },
      [dispatch, formValues, formValid]
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
        addKey: (name, defaultValue, callback) => dispatch.addKey({ name, defaultValue, callback }),
        removeKey: (name) => dispatch.removeKey({ name })
      }),
      [dispatch]
    );

    const ctx = useMemo(
      () => ({
        inputProps,
        ...handlers
      }),
      [inputProps, handlers]
    );

    useEffect(() => {
      handleOnChange();
      form.changedFields.forEach((name) => {
        const value = form.values[name];
        const error = form.errors[name];
        const key = form.keys[name];
        const callback = form.callbacks[name];
        if (callback) {
          callback({ value, error, key });
        }
      });
    }, [dispatch, form.triggerOnChange, form.changedFields, handleOnChange]);

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
