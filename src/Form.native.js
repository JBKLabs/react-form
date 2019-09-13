import React from 'react';
import PropTypes from 'prop-types';

import formFactory from './formFactory';

const FormWrapper = ({ children }) => (
  <>
    {children}
  </>
);

FormWrapper.propTypes = {
  children: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default formFactory(FormWrapper);