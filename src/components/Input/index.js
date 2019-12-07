import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import Fuse from 'fuse.js';
import { ListItem, ListItemText, Input } from '@material-ui/core';
import ClampLines from 'react-clamp-lines';

import styles from '../../components/App.module.scss';

const opts = { name: 'name', meta: 'meta' };

const SearchInput = ({ data }) => {
  const [result, setResult] = useState(data);
  const options = { keys: [opts.name, opts.meta] };
  const fuse = new Fuse(data, options);
  const items = data;

  const handleSelect = selectedItem => {
    window.open(selectedItem.url, '_blank');
  };
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
            <Input
              disableUnderline={true}
              className={styles.searchBox}
              {...getInputProps()}
            />
            <ul className={styles.resultList} {...getMenuProps()}>
              {isOpen && items
                ? fuse.search(inputValue).map((item, index) => (
                    <ListItem
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          width: '100%',
                          backgroundColor:
                            highlightedIndex === index
                              ? '#f5f6f8'
                              : 'transparent',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }
                      })}
                      href={item.url}
                      target="_blank"
                      rel="nofollow"
                    >
                      <ListItemText
                        primary={
                          <ClampLines
                            text={`${item.name} + ${item.meta}`}
                            lines={2}
                            ellipsis="..."
                            moreText="Expand"
                            lessText="Collapse"
                            className="custom-class"
                          />
                        }
                      />
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
export default SearchInput;
