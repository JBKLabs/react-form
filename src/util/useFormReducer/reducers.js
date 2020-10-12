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
  triggerOnChange: random.generate(8),
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
    triggerOnChange: random.generate(8),
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
    triggerOnChange: random.generate(8),
    changedFields: [name]
  }
};

export const addKey = (state, { name, defaultValue, callback }) => {
  const value = defaultValue;
  const error = null;
  const key = random.generate(8);
  callback({ value, error, key });

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
    defaults: {
      ...state.defaults,
      [name]: defaultValue
    },
    callbacks: {
      ...state.callbacks,
      [name]: callback
    }
  };
};

export const removeKey = (state, { name }) => {
  const { [name]: removeValue, ...values } = state.values;
  const { [name]: removedDefault, ...defaults } = state.defaults;
  const { [name]: removedError, ...errors } = state.errors;
  const { [name]: removedKey, ...keys } = state.keys;
  const { [name]: removedCallback, ...callbacks } = state.callbacks;
  const formValid = reduceErrors(errors);

  return {
    values,
    defaults,
    errors,
    callbacks,
    formValid,
    keys,
    triggerOnChange: random.generate(8),
    changedFields: []
  };
}
