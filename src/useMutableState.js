import { useState, useCallback, useEffect } from 'react';

const useMutableState = (defaultValue, callback = () => {}) => {
  const [state, setState] = useState(defaultValue);

  const updateState = useCallback((changes) => {
    setState({ ...state, ...changes });
  }, [state, defaultValue]);

  useEffect(() => {
    if (state !== defaultValue) {
      callback();
    }
  }, [state, defaultValue]);

  return [state, updateState];
};

export default useMutableState;