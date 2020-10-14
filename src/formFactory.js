import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import EventEmitter from 'eventemitter3';

import { transposeKeys, useFormReducer, globMatch } from './util';
import FormContext from './FormContext';

const formFactory = (FormWrapper) => {
  const Form = ({
    onSubmit,
    onChange,
    inputProps,
    children,
    ...remainingProps
  }) => {
    const emitter = useRef(new EventEmitter());
    const formRef = useRef({});
    const [form, dispatch] = useFormReducer();
    formRef.current = form;

    const updateSubscribers = useCallback(
      (callback) => {
        const transposedValues = transposeKeys(formRef.current.values);

        const resetInputs = (patterns = ['*']) => {
          const names = globMatch(
            patterns,
            Object.keys(formRef.current.values)
          );
          dispatch.resetNamedInputs({ names });
        };

        callback({
          formValid: formRef.current.formValid,
          values: transposedValues,
          resetInputs
        });
      },
      [dispatch, formRef]
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
        addKey: (name, defaultValue, defaultError = null) =>
          dispatch.addKey({
            name,
            defaultValue,
            defaultError,
            emitter: emitter.current
          }),
        removeKey: (name) => dispatch.removeKey({ name }),
        getField: (name) => ({
          value: formRef.current.values[name],
          error: formRef.current.errors[name],
          key: formRef.current.keys[name]
        }),
        emitter: emitter.current
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
      form.changedFields.forEach((name) => {
        emitter.current.emit(`field:${name}`, handlers.getField(name));
      });
      handleOnChange();
    }, [dispatch, handlers, emitter, form.changedFields, handleOnChange]);

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
