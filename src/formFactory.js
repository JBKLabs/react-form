import React, { useMemo, useCallback, useEffect, useRef } from 'react';

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
    const formRef = useRef({});
    const [form, dispatch, emitter] = useFormReducer();
    formRef.current = form;

    const updateSubscribers = useCallback(
      (callback, includeChanges) => {
        if (!callback) return;

        const transposedValues = transposeKeys(formRef.current.fields);

        const resetInputs = (patterns = ['*']) => {
          const names = globMatch(
            patterns,
            Object.keys(formRef.current.fields)
          );
          dispatch.resetNamedFields({ names });
        };

        const revalidateInputs = (patterns = ['*']) => {
          const names = globMatch(
            patterns,
            Object.keys(formRef.current.fields)
          );
          dispatch.revalidateNamedFields({ names });
        };

        const eventContext = {
          formValid: formRef.current.formValid,
          values: transposedValues,
          resetInputs,
          revalidateInputs
        };

        if (includeChanges) {
          eventContext.changedFields = formRef.current.changedFields;
        }

        callback(eventContext);
      },
      [dispatch, formRef]
    );

    const handleOnSubmit = useRef();
    handleOnSubmit.current = (e) => {
      e.preventDefault();
      updateSubscribers(onSubmit, false);
    };

    const handleOnChange = useRef();
    handleOnChange.current = () => updateSubscribers(onChange, true);

    const handlers = useMemo(
      () => ({
        registerField: dispatch.registerField,
        removeField: dispatch.removeField,
        updateField: dispatch.updateField,
        getField: (name) =>
          formRef.current.fields[name] || { value: '', error: null, key: null },
        emitter
      }),
      [dispatch, emitter, formRef]
    );

    const ctx = useMemo(
      () => ({
        inputProps,
        formValid: form.formValid,
        ...handlers
      }),
      [inputProps, form.formValid, handlers]
    );

    useEffect(handleOnChange.current, [handleOnChange, form.changedFields]);

    return (
      <FormContext.Provider value={ctx}>
        <FormWrapper onSubmit={handleOnSubmit.current} {...remainingProps}>
          {children}
        </FormWrapper>
      </FormContext.Provider>
    );
  };

  return Form;
};

export default formFactory;
