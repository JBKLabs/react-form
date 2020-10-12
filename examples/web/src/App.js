import React from 'react';
import { Route, Switch } from 'react-router';

import Dashboard from 'src/views/Dashboard';

const App = () => (
  <div style={{ padding: 15 }}>
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  </div>
);

export default App;
