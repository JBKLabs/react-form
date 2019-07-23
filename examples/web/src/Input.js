import React from 'react';
import PropTypes from 'prop-types';
import { withFormHandling } from '@jbk/react-form';

const styles = {
  label: {
    marginTop: '15px',
    marginBottom: '-5px'
  },
  input: {
    width: '70%',
    margin: '10px',
    padding: '5px',
    height: '40px'
  }
};

const Input = ({ 
  value, setFormInputValue, setFormInputValidity,
  optional, label, ...remainingProps
}) => {
  const onChange = e => setFormInputValue(e.target.value);

  return (
    <>
      {label && <div style={styles.label}>{label}</div>}
      <input
        style={styles.input}
        value={value || ''}
        onChange={onChange}
        {...remainingProps}
      />
    </>
  );
};

Input.propTypes = {
  value: PropTypes.string,
};

export default withFormHandling(Input);