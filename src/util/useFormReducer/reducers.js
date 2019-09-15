const reduceErrors = (errors) => Object
  .values(errors)
  .filter(v => v !== undefined)
  .reduce((valid, nextError) => valid && nextError === null, true);

export const setValue = (state, { name, value }) => ({
  ...state,
  values: {
    ...state.values,
    [name]: value,
  },
  triggerOnChange: true,
});

export const setMany = (state, { changes }) => ({
  ...state,
  values: {
    ...state.values,
    ...changes
  },
  triggerOnChange: true,
});

export const setDefault = (state, { name, defaultValue }) => ({
  ...state,
  values: {
    ...state.values,
    [name]: defaultValue,
  },
  defaults: {
    ...state.defaults,
    [name]: defaultValue,
  },
  triggerOnChange: true,
});

export const setError = (state, { name, error }) => {
  const errors = {
    ...state.errors,
    [name]: error,
  };

  const formValid = reduceErrors(errors);

  return {
    ...state,
    errors,
    formValid,
    triggerOnChange: true,
  }
};

export const removeKey = (state, { name }) => {
  const { [name]: removeValue, ...values } = state.values;
  const { [name]: removedDefault, ...defaults } = state.defaults;
  const { [name]: removedError, ...errors } = state.errors;
  const formValid = reduceErrors(errors);

  return {
    values,
    defaults,
    errors,
    formValid,
    triggerOnChange: true
  };
}

export const unset = (state, { trigger }) => ({
  ...state,
  [trigger]: false,
});