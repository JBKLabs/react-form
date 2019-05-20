import React from 'react';
import { Form, TextInput } from 'react-native-form';

const App = () => (
  <Form
    onFormValuesChange={values => console.log(values)}
  >
    <TextInput name="firstName" />
    <TextInput name="lastName" />
    <TextInput name="email" />
  </Form>
);

export default App;