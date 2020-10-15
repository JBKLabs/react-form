import random from 'randomstring';

const isFormValid = (fields) => Object
  .keys(fields)
  .reduce((valid, name) => valid && fields[name].error === null, true);

export const registerField = (emitter, state, action) => {
  const validateValue = (value) => {
    try {
      const result = action.validateValueRef.current(value);
      return result || null;
    } catch (e) {
      return e.displayText || e;
    }
  };
  const defaultValue = action.defaultValue;
  const initialError = validateValue(defaultValue);
  const register = { validateValue, defaultValue, initialError };

  const field = { 
    value: action.defaultValue, 
    error: register.initialError,
    key: random.generate(8)
  };

  emitter.emit(action.name, field);
  const fields = {
    ...state.fields,
    [action.name]: field
  };

  return {
    ...state,
    fields,
    registry: {
      ...state.registry,
      [action.name]: register
    },
    formValid: isFormValid(fields)
  }
};

export const removeField = (_, state, { name }) => {
  const { [name]: removedField, ...fields } = state.fields;
  const { [name]: removedRegistration, ...registry } = state.registry;
  const formValid = isFormValid(fields);
  return {
    ...state,
    fields,
    registry,
    formValid
  };
};

export const updateField = (emitter, state, action) => {
  const value = action.value;
  const error = state.registry[action.name].validateValue(value);
  const field = { ...state.fields[action.name], value, error };

  emitter.emit(action.name, field);
  const fields = {
    ...state.fields,
    [action.name]: field
  };

  return {
    ...state,
    fields,
    formValid: isFormValid(fields),
    identity: random.generate(8)
  };
};

export const resetNamedFields = (emitter, state, { names }) => {
  const fields = { ...state.fields };
  names.forEach((name) => {
    fields[name] = {
      value: state.registry[name].defaultValue,
      error: state.registry[name].initialError,
      key: random.generate(8)
    };
    
    emitter.emit(name, fields[name]);
  });

  return {
    ...state,
    fields,
    formValid: isFormValid(fields),
    identity: random.generate(8)
  };
};

export const revalidateNamedFields = (emitter, state, { names }) => {
  const fields = { ...state.fields };
  names.forEach((name) => {
    fields[name] = {
      ...state.fields[name],
      error: state.registry[name].validateValue(state.fields[name].value)
    };
    
    emitter.emit(name, fields[name]);
  });

  return {
    ...state,
    fields,
    formValid: isFormValid(fields),
    identity: random.generate(8)
  };
};