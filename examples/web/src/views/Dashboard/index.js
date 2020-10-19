import React from 'react';
import styled from 'styled-components';

import CurrentTime from './CurrentTime';
import Users from './Users';

const Dashboard = () => (
  <>
    <h1>Example React App</h1>
    {window.env.ENABLE_DEBUG_MODE === 'true' && <div>debug mode enabled</div>}
    <Container>
      <CurrentTime />
      <Users />
    </Container>
  </>
);

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
