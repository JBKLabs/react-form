import React, {
  useEffect,
  useLayoutEffect,
  useContext,
  useCallback,
  useRef
} from 'react';

import FormContext from './FormContext';
import useFormField from './useFormField';

const withFormHandling = (FormInput, onFormChange = () => {}) => ({
  name,
  defaultValue = '',
  ...remainingProps
}) => {
  const { inputProps, addKey, removeKey } = useContext(FormContext);
  const remainingPropsRef = useRef(remainingProps);
  remainingPropsRef.current = remainingProps;

  const computeError = useCallback(
    (val) => {
      try {
        if (typeof onFormChange === 'function') {
          onFormChange(val, remainingPropsRef.current);
        } else if (Array.isArray(onFormChange)) {
          onFormChange.forEach((cb) => cb(val, remainingPropsRef.current));
        }
        return null;
      } catch (e) {
        const message = e.displayText || e;
        return message;
      }
    },
    [remainingPropsRef]
  );

  useLayoutEffect(() => {
    const defaultError = computeError(defaultValue);
    addKey(name, defaultValue, defaultError);
    return () => removeKey(name);
  }, [name, defaultValue, addKey, removeKey, computeError]);

  const { value, error, key, setValue, setError } = useFormField(name);

  useEffect(() => {
    const currentError = computeError(value);
    setError(currentError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, value, inputProps, setError]);

  return (
    <FormInput
      value={value}
      error={error}
      setError={setError}
      setValue={setValue}
      name={name}
      inputProps={inputProps}
      {...remainingProps}
      key={key}
    />
  );
};

export default withFormHandling;
