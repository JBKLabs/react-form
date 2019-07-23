import React, { Component } from 'react';
import { Form } from '@jbk/react-form';

import Input from './Input';

class App extends Component {
  render() {
    return (
      <Form
        onFormValuesChange={values => console.log(values)}
      >
        <Input name="firstName" />
        <Input name="lastName" />
        <Input name="email" />
      </Form>
    );
  }
}

export default App;