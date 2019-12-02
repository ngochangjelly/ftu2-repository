import React, { useEffect } from 'react';
import './App.css';
import config from './api/config';
import load from './api/sheet';

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
      console.log(data);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
