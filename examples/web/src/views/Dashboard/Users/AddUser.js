import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, ValidationError } from '@jbknowledge/react-form';
import { withModelEffects } from '@jbknowledge/react-models';

import { Input, Button } from 'src/common';

const AddUser = ({ addUserAsync }) => {
  const validateConfirmPassword = useCallback((value, _, getField) => {
    const password = getField('password');
    if (!password || !!password.error) throw new ValidationError(password.error);
    if (password.value !== value) throw new ValidationError('Password does not match.');
  }, []);

  return (
    <Form
      onSubmit={({ formValid, values: user, resetInputs }) => {
        if (formValid) {
          addUserAsync(user);
          resetInputs();
        }
      }}
      onChange={({ changedFields, revalidateInputs }) => {
        if (changedFields.has('password')) {
          revalidateInputs(['confirmPassword']);
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
        inputProps={{
          type: 'password'
        }}
      />
      <Input
        name="confirmPassword"
        label="Confirm Password"
        customValidation={validateConfirmPassword}
        inputProps={{
          type: 'password'
        }}
      />
      <Button type="submit">Add User</Button>
    </Form>
  );
}

const mapEffects = ({
  users: { addUserAsync }
}) => ({
  addUserAsync
});

export default withModelEffects(mapEffects)(AddUser);

AddUser.propTypes = {
  addUserAsync: PropTypes.func,
};