import React from 'react';
import styles from './popup.module.scss';
import Card from '@material-ui/core/Card';

const Popup = ({ closePopup }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <Card
          children={
            <div>
              ashdjahsd
              <button onClick={closePopup}>close</button>
            </div>
          }
        />
      </div>
    </div>
  );
};
export default Popup;
