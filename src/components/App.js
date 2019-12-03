import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';

import { initClient } from '../api/sheet';
import './App.css';
import Input from './Input';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    window.gapi.load('client:auth2', () =>
      initClient((data, error) => {
        if (data) {
          setData(data.items);
        }
        if (error) {
          console.log(error);
        }
      })
    );
  }, []);

  return (
    <div className={classNames('appBg', 'center')}>
      <h2 style={{ marginBottom: '20px' }}>Let's type something</h2>
      <Input data={data} />
    </div>
  );
}

export default App;
