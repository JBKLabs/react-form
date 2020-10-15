import { useReducer, useMemo, useRef } from 'react';
import EventEmitter from 'eventemitter3';

import * as reducers from './reducers';

const useFormReducer = () => {
  const emitter = useRef(new EventEmitter());
  const [form, dispatch] = useReducer(
    (state, action) => reducers[action.type](emitter.current, state, action),
    {
      fields: {},
      registry: {},
      formValid: false,
      identity: 'init'
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

  return [form, dispatchHelper, emitter.current];
}

export default useFormReducer;
