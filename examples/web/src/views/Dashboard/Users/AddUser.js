import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, useFormField, useFormState, ValidationError } from '@jbknowledge/react-form';
import { withModelEffects } from '@jbknowledge/react-models';

import { Input, Button } from 'src/common';

const ConfirmPasswordInput = (props) => {
  const [password] = useFormState('password');

  const { value, error, key, setValue } = useFormField('confirmPassword', {
    validateValue: (value) => {
      if (password.error) return password.error;
      if (password.value !== value) return 'does not match';
      return null;
    }
  });

  return (
    <Input.Controlled
      label={"Confirm Password"}
      value={value}
      error={error}
      key={key}
      setValue={setValue}
      {...props}
    />
  );
};

const AddUser = ({ addUserAsync }) => (
  <Form
    onSubmit={({ formValid, values: user, resetInputs }) => {
      if (formValid) {
        addUserAsync(user);
        resetInputs();
      }
    }}
    onChange={({ values, prevValues, revalidateInputs }) => {
      if (
        prevValues.password !== values.password ||
        prevValues.confirmPassword !== values.confirmPassword
      ) {
        revalidateInputs(['password', 'confirmPassword']);
      }
    }}
  >
    <Input
      name="name.first"
      regex="^(?!\s*$).+"
      defaultErrorMessage="First name required"
      label="First Name"
    />
    <Input
      name="name.last"
      regex="^(?!\s*$).+"
      defaultErrorMessage="Last name required"
      label="Last Name"
    />
    <Input
      name="password"
      regex="^.{10,}$"
      defaultErrorMessage="Password too weak. Must be at least 10 characters long."
      label="Password"
    />
    <ConfirmPasswordInput />
    <Button type="submit">Add User</Button>
  </Form>
);

const mapEffects = ({
  users: { addUserAsync }
}) => ({
  addUserAsync
});

export default withModelEffects(mapEffects)(AddUser);

AddUser.propTypes = {
  addUserAsync: PropTypes.func,
};