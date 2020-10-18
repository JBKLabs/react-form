import { useLayoutEffect, useState } from 'react';
import useFormContext from './useFormContext';

const useFormState = (name) => {
  const { emitter, formValid, getField } = useFormContext();
  const [state, setState] = useState(getField(name));

  useLayoutEffect(() => {
    emitter.addListener(name, setState);
    return () => emitter.removeListener(name, setState);
  }, [name, emitter, setState]);

  return [state, formValid];
};

export default useFormState;
