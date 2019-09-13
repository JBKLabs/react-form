import React from 'react';
import { Text } from 'react-native';
import { Form } from '@jbk/react-form/native';

import Input from './Input';

const App = () => (
  <Form
    onChange={x => console.log(x)}
  >
    <Text>New User</Text>
    <Input name="firstName" />
  </Form>
);

export default App;