import React,{ useEffect, useState } from 'react';
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

const App = () => {
  const [def,setDef] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setDef('wow');
    }, 3000);
  }, []);
  return (
    <div style={styles.wrapper}>
      <div style={styles.formWrapper}>
        <Form 
          onSubmit={values => console.log(values)} 
          onChangeFormValid={formValid => console.log({ formValid })}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Input name="firstName" defaultValue={def} />
          <Input name="lastName" regex=".*" />
          <Input name="phone" regex="^\d{7}$" />
          <button type="submit">wow</button>
        </Form>
      </div>
    </div>
  );
}

export default App;