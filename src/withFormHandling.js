import React, { useEffect, useLayoutEffect, useContext, useCallback, useState } from 'react';

import FormContext from './FormContext';

const withFormHandling = (FormInput, onFormChange = () => { }) => ({
  name,
  defaultValue = '',
  ...remainingProps
}) => {
  const {
    setValue,
    setError,
    inputProps,
    addKey,
    removeKey
  } = useContext(FormContext);
  const [currentValue, setCurrentValue] = useState('');
  const [currentError, setCurrentError] = useState(null);
  const [currentKey, setCurrentKey] = useState();

  const setNamedValue = useCallback(
    (nextValue) => {
      setValue(name, nextValue);
    },
    [name, setValue]
  );

  const onFieldUpdate = useCallback(({ value, error, key }) => {
    setCurrentValue(value);
    setCurrentError(error);
    setCurrentKey(key);
  },[setCurrentValue, setCurrentError, setCurrentKey]);

  useLayoutEffect(() => {
    addKey(name, defaultValue, onFieldUpdate);
    return () => removeKey(name);
  }, [name, defaultValue, addKey, removeKey]);

  useEffect(() => {
    try {
      if (typeof onFormChange === 'function') {
        onFormChange(currentValue, remainingProps);
      } else if (Array.isArray(onFormChange)) {
        onFormChange.forEach(cb => cb(currentValue, remainingProps));
      }
      setError(name, null);
    } catch (e) {
      const message = e.displayText || e;
      setError(name, message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, currentValue, inputProps]);

  return (
    <FormInput
      value={currentValue}
      error={currentError}
      setValue={setNamedValue}
      name={name}
      inputProps={inputProps}
      {...remainingProps}
      key={currentKey}
    />
  );
};

export default withFormHandling;
