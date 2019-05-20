import React from 'react';

import formFactory from './formFactory';
import withFormHandlingFactory from './withFormHandlingFactory';

const { Provider, Consumer } = React.createContext();

const exports = {
  Form: formFactory(Provider),
  withFormHandling: withFormHandlingFactory(Consumer),
};

export default exports;