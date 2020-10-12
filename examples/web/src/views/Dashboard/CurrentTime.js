import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CurrentTime = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1);

    return () => clearInterval(interval);
  });

  return (
    <div style={{ width: '100%' }}>
      <h2>Current time</h2>
      {time.format('dddd, MMMM Do YYYY, h:mm:ss.SSS a')}
    </div>
  );
};

export default CurrentTime;
