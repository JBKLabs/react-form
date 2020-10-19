import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import useFormContext from './useFormContext';

const noop = () => null;

const useFormField = (name, options = {}) => {
  const { registerField, updateField, removeField, emitter } = useFormContext();
  const [state, setState] = useState({ value: '', error: null, key: '' });
  const defaultValue = options.defaultValue || '';
  const validateValueRef = useRef(noop);
  validateValueRef.current = options.validateValue || noop;

  useLayoutEffect(() => {
    registerField({ name, defaultValue, validateValueRef, onInit: setState });
    emitter.addListener(name, setState);
    return () => {
      emitter.removeListener(name, setState);
      removeField({ name });
    };
  }, [
    name,
    defaultValue,
    validateValueRef,
    emitter,
    registerField,
    setState,
    removeField
  ]);

  const setValue = useCallback(
    (value) => {
      updateField({ name, value });
    },
    [name, updateField]
  );

  return { ...state, setValue };
};

export default useFormField;
