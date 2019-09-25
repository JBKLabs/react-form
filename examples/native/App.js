import React from 'react';
import { Text } from 'react-native';
import { Form } from '@jbknowledge/react-form/native';

import Input from './Input';

const App = () => (
  <Form>
    <Text>New User</Text>
    <Input name="firstName" />
  </Form>
);

export default App;
