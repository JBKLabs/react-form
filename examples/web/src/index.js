import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModelProvider } from '@jbknowledge/react-models';
import 'core-js/stable';

import App from './App';

ReactDOM.render(
  <ModelProvider>
    <Router>
      <App />
    </Router>
  </ModelProvider>,
  document.getElementById('root')
);
