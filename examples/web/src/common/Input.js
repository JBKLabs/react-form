import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ValidationError, withFormHandling } from '@jbknowledge/react-form';

const Input = ({ value, setValue, error, label, inputProps }) => {
  const [blurred, setBlurred] = useState(false);

  return (
    <Container>
      <Label>{label}</Label>
      <TextInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setBlurred(true)}
        className={error && blurred ? 'error' : ''}
        {...inputProps}
      />
      {error && blurred && <Error>{error}</Error>}
    </Container>
  );
};

const onFormChange = (value, props, getFormField) => {
  const { customValidation, regex, defaultErrorMessage } = props;

  if (customValidation && typeof customValidation === 'function') {
    customValidation(value, props, getFormField);
  } else if (regex && !value.match(regex)) {
    throw new ValidationError(defaultErrorMessage);
  }
};

Input.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.shape({})
};

const WrappedInput = withFormHandling(Input, onFormChange);
WrappedInput.Controlled = Input;
export default WrappedInput;

const Container = styled.div`
  padding-bottom: 10px;
`;

const Label = styled.div`
  color: dimgray;
  padding-bottom: 2px;
`;

const Error = styled.div`
  color: #d9534f;
  font-size: 14px;
`;

const TextInput = styled.input`
  width: 25%;
  line-height: 1.5;
  padding: 0.375rem 0.5rem;
  height: calc(1.5em + 0.75rem + 2px);
  margin: 2px 0;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 0.25rem;

  &.error {
    border: 1px solid #d9534f;
  }
`;
