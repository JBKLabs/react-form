import { useReducer, useMemo } from 'react';

import * as reducers from './reducers';

const useFormReducer = () => {
  const [form, dispatch] = useReducer(
    (state, action) => reducers[action.type](state, action),
    {
      values: {},
      defaults: {},
      keys: {},
      errors: {},
      callbacks: {},
      formValid: false,
      triggerOnChange: false,
      changedFields: []
    }
  );

  const dispatchHelper = useMemo(() => {
    return Object
      .keys(reducers)
      .reduce((helper, type) => ({
        ...helper,
        [type]: (action) => dispatch({ ...action, type })
      }), {});
  }, [dispatch]);

  return [form, dispatchHelper];
}

export default useFormReducer;
