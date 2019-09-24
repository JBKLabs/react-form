import random from 'randomstring';

const reduceErrors = (errors) => Object
  .values(errors)
  .filter(value => value !== undefined)
  .reduce((valid, nextError) => valid && nextError === null, true);

const hash = () => random.generate(8);

export const setValue = (state, { name, value }) => ({
  ...state,
  values: {
    ...state.values,
    [name]: value
  },
  triggerOnChange: true
});

export const resetNamedInputs = (state, { names }) => {
  const updatedValues = names.reduce((obj, name) => ({
    ...obj,
    [name]: state.defaults[name]
  }), {});

  const updatedKeys = names.reduce((obj, name) => ({
    ...obj,
    [name]: random.generate(8)
  }), {});

  return {
    ...state,
    values: {
      ...state.values,
      ...updatedValues
    },
    keys: {
      ...state.keys,
      ...updatedKeys
    },
    triggerOnChange: true
  }
};

export const setDefault = (state, { name, defaultValue }) => ({
  ...state,
  values: {
    ...state.values,
    [name]: defaultValue
  },
  keys: {
    ...state.keys,
    [name]: hash()
  },
  defaults: {
    ...state.defaults,
    [name]: defaultValue
  },
  triggerOnChange: true
});

export const setError = (state, { name, error }) => {
  const errors = {
    ...state.errors,
    [name]: error
  };

  const formValid = reduceErrors(errors);

  return {
    ...state,
    errors,
    formValid,
    triggerOnChange: true
  }
};

export const removeKey = (state, { name }) => {
  const { [name]: removeValue, ...values } = state.values;
  const { [name]: removedDefault, ...defaults } = state.defaults;
  const { [name]: removedError, ...errors } = state.errors;
  const { [name]: removedKey, ...keys } = state.keys;
  const formValid = reduceErrors(errors);

  return {
    values,
    defaults,
    errors,
    formValid,
    keys,
    triggerOnChange: true
  };
}

export const unset = (state, { trigger }) => ({
  ...state,
  [trigger]: false
});
