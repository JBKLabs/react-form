import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';

import FormContext from './FormContext';

const useFormField = (name, options = {}) => {
  const {
    emitter,
    getField,
    setValue,
    setError,
    addKey,
    removeKey
  } = useContext(FormContext);
  const [state, setState] = useState(getField(name));

  const {
    registerInput = false,
    defaultValue = '',
    initialError = null
  } = options;

  useLayoutEffect(() => {
    if (registerInput) {
      addKey(name, defaultValue, initialError);
      return () => removeKey(name);
    }
    return null;
  }, [name, registerInput, defaultValue, initialError, addKey, removeKey]);

  useEffect(() => {
    const registerEvent = `register:${name}`;
    const updateEvent = `field:${name}`;
    emitter.addListener(registerEvent, setState);
    emitter.addListener(updateEvent, setState);
    return () => {
      emitter.removeListener(registerEvent, setState);
      emitter.removeListener(updateEvent, setState);
    };
  }, [name, emitter]);

  const setNamedValue = useCallback((value) => setValue(name, value), [
    name,
    setValue
  ]);

  const setNamedError = useCallback((error) => setError(name, error), [
    name,
    setError
  ]);

  return {
    ...state,
    setValue: setNamedValue,
    setError: setNamedError
  };
};

export default useFormField;
