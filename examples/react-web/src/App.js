import React from 'react';
import { Form } from '@jbk/react-form';

import Input from './Input';

const styles = {
  wrapper: {
    backgroundColor: '#3F99B3',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formWrapper: {
    width: '500px',
    height: '300px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 5px 8px 8px #378AA2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
};

const App = () => (
  <div style={styles.wrapper}>
    <div style={styles.formWrapper}>
      <Form
        onFormValuesChange={values => console.log(values)}
      >
        <Input label="Email" name="email" />
        <Input label="Password" name="password" type="password" />
      </Form>
    </div>
  </div>
);

export default App;