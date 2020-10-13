import random from 'randomstring';

const reduceErrors = (errors) => Object
  .values(errors)
  .filter(value => value !== undefined)
  .reduce((valid, nextError) => valid && nextError === null, true);

export const setValue = (state, { name, value }) => ({
  ...state,
  values: {
    ...state.values,
    [name]: value
  },
  changedFields: [name]
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
    changedFields: names
  }
};

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
    changedFields: [name]
  }
};

export const addKey = (state, { name, defaultValue, defaultError, emitter }) => {
  const value = defaultValue;
  const error = defaultError;
  const key = random.generate(8);

  emitter.emit(`register:${name}`, { value, error, key });

  return {
    ...state,
    values: {
      ...state.values,
      [name]: value
    },
    keys: {
      ...state.keys,
      [name]: key
    },
    errors: {
      [name]: error
    },
    defaults: {
      ...state.defaults,
      [name]: defaultValue
    },
    identity: random.generate(8)
  };
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
    changedFields: []
  };
}
