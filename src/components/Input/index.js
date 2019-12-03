import React, { useEffect } from 'react';
import { HotKeys } from 'react-hotkeys';
import InputBase from '@material-ui/core/InputBase';
import debounce from 'react-debouncing';
import { makeApiCall } from '../../api/sheet';

const keyMap = {
  DELETE_NODE: ['del', 'backspace']
};
export default function Input() {
  const handleKeyUp = event => {
    switch (event.keyCode) {
      case 13:
        console.log('hit enter');
        break;
      default:
        return;
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    // clean up event listener
    return () => window.removeEventListener('keyup');
  });
  const handleChange = debounce(e => {
    console.log(e.target.value);
    makeApiCall();
  }, 300);
  return (
    <HotKeys>
      <div>
        <InputBase
          id="searchBox"
          onChange={handleChange}
          color={'primary'}
          style={{
            width: 600,
            height: 50,
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '0px 20px 0px 20px'
          }}
        />
      </div>
    </HotKeys>
  );
}
