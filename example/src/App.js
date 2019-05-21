import React, { Component } from 'react';
import { Form, TextInput, ValidationError } from 'react-native-form';

const containerStyle = ({ valid }) => ({
  backgroundColor: valid ? 'white' : 'yellow'
});

class App extends Component {
  state = {
    defaultValue: '',
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ defaultValue: 'wow' });
    }, 2000);
  }

  render() {
    const { defaultValue } = this.state;

    return (
      <Form
        onFormValuesChange={values => console.log(values)}
        onFormValidityChange={validity => console.log(validity)}
      >
        <TextInput name="firstName" />
        <TextInput name="lastName" />
        <TextInput name="email" />
      </Form>
    );
  }
}

export default App;