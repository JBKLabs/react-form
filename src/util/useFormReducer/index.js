import { useReducer } from 'react';

import * as reducers from './reducers';

const useFormReducer = () => {
  const [form, dispatch] = useReducer(
    (state, action) => reducers[action.type](state, action),
    {
      values: {},
      defaults: {},
      errors: {},
      formValid: false,
      triggerOnChange: false,
    }
  );

  const dispatchHelper = Object
    .keys(reducers)
    .reduce((helper, type) => ({ ...helper, [type]: (action) => dispatch({ ...action, type }) }), {});

  return [form, dispatchHelper];
}

export default useFormReducer;