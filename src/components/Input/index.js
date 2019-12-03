import React, { useState, useEffect } from 'react';
import debounce from 'react-debouncing';
import Downshift from 'downshift';
import Fuse from 'fuse.js';
import { ListItem, ListItemText } from '@material-ui/core';

import { makeApiCall } from '../../api/sheet';

const opts = { name: 'name', meta: 'meta' };

export const ListItemLink = props => {
  return <ListItem button component="a" {...props} />;
};
const Input = ({ data }) => {
  const [result, setResult] = useState(data);
  const options = { keys: [opts.name, opts.meta] };
  const fuse = new Fuse(data, options);
  const items = data;
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
    return () => window.removeEventListener('keyup', handleKeyUp);
  });
  const handleChange = debounce(e => {
    console.log(e.target.value);
    // makeApiCall();
  }, 300);
  const handleSelect = selectedItem =>
    alert(
      selectedItem ? `You selected ${selectedItem.name}` : 'Selection Cleared'
    );
  return (
    <div>
      <Downshift
        onChange={selection => handleSelect(selection)}
        itemToString={item => (item ? item.name : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <input className="searchBox" {...getInputProps()} />
            <ul className="resultBox" {...getMenuProps()}>
              {isOpen && items
                ? fuse.search(inputValue).map((item, index) => (
                    <ListItemLink
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }
                      })}
                      href="#simple-list"
                    >
                      <ListItemText primary={`${item.name} + ${item.meta}`} />
                    </ListItemLink>
                  ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
};
export default Input;
