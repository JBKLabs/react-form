import React, { useState, useMemo, useCallback, useEffect } from 'react';

import transposeKeys from './transposeKeys';
import FormContext from './FormContext';
import useMutableState from './useMutableState';

const formatFormValues = (values) => {
  const formattedValues = Object
    .keys(values)
    .filter(k => values[k] !== undefined)
    .reduce((obj, key) => ({ ...obj, [key]: values[key]}), {});

  return transposeKeys(formattedValues);
};

const formFactory = (FormWrapper) => {
  const Form = ({ 
    onSubmit,
    onChange,
    children, 
    ...remainingProps
  }) => {
    const [formValid, setFormValid] = useState(true);
    const [defaults, setDefaults] = useMutableState({});
    const [values, setValues] = useMutableState({});
    const [errors, setErrors] = useMutableState({});

    const updateSubscribers = useCallback((callback) => {
      const formattedValues = cleanFormValues(values);

      const resetInputs = (keys) => {
        keys.forEach(k => setValues({ [k]: defaults[k] }));
        updateSubscribers(onChange);
      }

      callback({ formValid, values: formattedValues, resetInputs });
    },[formValid, values, defaults, onChange]);

    const handleOnSubmit = () => updateSubscribers(onSubmit);
    const handleOnChange = () => updateSubscribers(onChange);

    const updateFormValid = useCallback(() => {
      const isFormValid = Object
        .values(errors)
        .filter(v => v !== undefined)
        .reduce((valid, nextError) => valid && nextError === null, true);
      setFormValid(isFormValid);
      handleOnChange();
    }, [values, errors]);

    const ctx = useMemo(() => ({
      values,
      errors,
      setValue: (name, value) => setValues({ [name]: value }, handleOnChange),
      setError: (name, error) => setErrors({ [name]: error }, updateFormValid),
      setDefault: (name, defaultValue) => {
        setDefaults({ [name]: defaultValue }, () => {
          setValues({ [name]: defaultValue }, handleOnChange);
        });
      },
      removeKey: (name) => {
        setDefaults({ [name]: undefined }, () => {
          setValues({ [name]: undefined }, () => {
            setErrors({ [name]: undefined }, handleOnChange)
          })
        })
      }
    }), [values, errors]);
  
    return (
      <FormContext.Provider value={ctx}>
        <FormWrapper onSubmit={handleOnSubmit} {...remainingProps}>
          {children}
        </FormWrapper>
      </FormContext.Provider>
    );
  };

  Form.defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
  };

  return Form;
}

export default formFactory;