import React, { Component } from 'react';
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

class App extends Component {
  onSubmit = ({ formValid, values, resetInputs }) => {
    // eslint-disable-next-line no-console
    console.log({ formValid, values });
    resetInputs();
  };

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.formWrapper}>
          <Form
            onSubmit={this.onSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Input name="user.phone" regex="^\d{7}$" />
            <Input name="user.email" regex="^\d{7}$" />
            <button type="submit">wow</button>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
