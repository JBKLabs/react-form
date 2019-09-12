import React from 'react';
import PropTypes from 'prop-types';

const FormWrapper = ({ children, onSubmit, ...remainingProps }) => (
  <form onSubmit={onSubmit} {...remainingProps}>
    {children}
  </form>
);

FormWrapper.propTypes = {
  children: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
};

export default FormWrapper;