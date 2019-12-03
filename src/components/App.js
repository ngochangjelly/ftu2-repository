import React, { useEffect } from 'react';
import classNames from 'classnames';

import config from '../api/config';
import { load } from '../api/sheet';
import './App.css';
import Input from './Input';

function App() {
  useEffect(() => {
    window.gapi.load('client:auth2', initClient);
  });
  const initClient = () => {
    window.gapi.client
      .init({
        apiKey: process.env.REACT_APP_APIKEY,
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        load(onLoad);
      });
  };
  const onLoad = (data, error) => {
    if (data) {
      // console.log(data);
    } else {
      console.log(error);
    }
  };

  return (
    <div className={classNames('appBg', 'center')}>
      <h2 style={{ marginBottom: '20px' }}>Let's type something</h2>
      <Input />
    </div>
  );
}

export default App;
