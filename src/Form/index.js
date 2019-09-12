import React from 'react';
import PropTypes from 'prop-types';

import formFactory from './formFactory';

const FormWrapper = ({ children, onSubmit, ...remainingProps }) => (
  <form onSubmit={onSubmit} {...remainingProps}>
    {children}
  </form>
);

FormWrapper.propTypes = {
  children: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
};

export default formFactory(FormWrapper);