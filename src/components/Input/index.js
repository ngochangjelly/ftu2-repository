import React, { useState, useEffect } from 'react';
import debounce from 'react-debouncing';
import Downshift from 'downshift';
import Fuse from 'fuse.js';
import { ListItem, ListItemText } from '@material-ui/core';
import BaseInput from '@material-ui/core/Input';

import { makeApiCall } from '../../api/sheet';

const opts = { name: 'name', meta: 'meta' };

const Input = ({ data }) => {
  const [result, setResult] = useState(data);
  const options = { keys: [opts.name, opts.meta] };
  const fuse = new Fuse(data, options);
  const items = data;

  const handleSelect = selectedItem => {
    window.open(selectedItem.url, '_blank');
  };
  const dummy = [
    {
      id: '1',
      meta: 'thanh thuy, photo, tai lieu hoc tap',
      name: 'test',
      url:
        'https://stackoverflow.com/questions/20278498/open-a-new-tab-with-javascript-but-stay-on-current-tab-using-javascript'
    }
  ];
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
            <BaseInput className="searchBox" {...getInputProps()} />
            <ul style={{ padding: '0 0 0 0' }} {...getMenuProps()}>
              {isOpen && items
                ? // ? fuse.search(inputValue).map((item, index) => (
                  dummy.map((item, index) => (
                    <ListItem
                      key={index}
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          width: '100%',
                          backgroundColor:
                            highlightedIndex === index
                              ? 'lightgray'
                              : 'transparent',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }
                      })}
                      href={item.url}
                      target="_blank"
                      rel="nofollow"
                    >
                      <ListItemText primary={`${item.name} + ${item.meta}`} />
                    </ListItem>
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
