import { useCallback, useContext, useEffect, useState } from 'react';

import FormContext from './FormContext';

const useFormField = (name) => {
  const { emitter, getField, setValue, setError } = useContext(FormContext);
  const [state, setState] = useState(getField(name));

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
