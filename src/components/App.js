import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { FiEdit } from 'react-icons/fi';
import { initClient } from '../api/sheet';
import styles from './App.module.scss';
import Input from './Input';
import { Fab, Tooltip } from '@material-ui/core';
import Popup from './Popup/index';

function App() {
  const [data, setData] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    if (!window.localStorage.getItem('data')) {
      window.gapi.load('client:auth2', () =>
        initClient((data, error) => {
          if (data) {
            setData(data.items);
            window.localStorage.setItem('data', JSON.stringify(data.items));
          }
          if (error) {
            console.log(error);
          }
        })
      );
    } else {
      setData(JSON.parse(window.localStorage.getItem('data')));
    }
  }, []);

  return (
    <div className={classNames(styles.appBg)}>
      {isPopupOpen ? (
        <Popup text="Close Me" closePopup={() => setPopupOpen(false)} />
      ) : null}
      <div className={styles.header}>
        <Tooltip style={{ fontSize: 'inherit' }} title="new post" arrow>
          <Fab
            onClick={() => setPopupOpen(true)}
            color="primary"
            aria-label="post"
          >
            <FiEdit style={{ width: '20px', height: '20px' }} />
          </Fab>
        </Tooltip>
      </div>
      <Input data={data} />
    </div>
  );
}

export default App;
