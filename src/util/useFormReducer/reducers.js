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
  const register = { validateValue, defaultValue };

  const field = { 
    value: action.defaultValue, 
    error: validateValue(defaultValue),
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
    formValid: isFormValid(fields),
    changedFields: new Set(Object.keys(fields))
  }
};

export const removeField = (__, state, { name }) => {
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
    changedFields: new Set([action.name])
  };
};

export const resetNamedFields = (emitter, state, { names }) => {
  const fields = { ...state.fields };
  names.forEach((name) => {
    const value = state.registry[name].defaultValue;
    const error = state.registry[name].validateValue(value);
    const key = random.generate(8);

    fields[name] = { value, error, key };

    emitter.emit(name, fields[name]);
  });

  return {
    ...state,
    fields,
    formValid: isFormValid(fields),
    changedFields: new Set(names)
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
    changedFields: new Set(names)
  };
};