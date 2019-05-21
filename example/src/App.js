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
        <TextInput name="firstName" regex="^brian$" containerStyle={containerStyle}/>
        <TextInput name="lastName" optional containerStyle={containerStyle} customValidation={value => value.length > 4}/>
        <TextInput containerStyle={containerStyle} defaultValue={defaultValue} name="email" customValidation={(value) => {
          if (value !== 'wow') throw new ValidationError('no');
          return true;
        }}/>
      </Form>
    );
  }
}

export default App;