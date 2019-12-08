import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import Fuse from 'fuse.js';
import {
  ListItem,
  ListItemText,
  Input,
  LinearProgress
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import ClampLines from 'react-clamp-lines';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import styles from '../../components/App.module.scss';

const opts = { name: 'name', meta: 'meta' };

const SearchInput = ({ data }) => {
  let history = useHistory();
  const [totalSearchResults, setTotalSearchResults] = useState(null);
  let [filteredRes, setFilteredRes] = useState(null);
  const options = { keys: [opts.name, opts.meta] };
  const fuse = new Fuse(data, options);
  const items = data;

  const handleSelect = selectedItem => {
    selectedItem && history.push(selectedItem.route);
  };
  return (
    <div>
      <Downshift
        onChange={selection => {
          handleSelect(selection);
        }}
        onInputValueChange={inputValue => {
          if (inputValue.length === 0) {
            setTotalSearchResults(null);
            setFilteredRes(null);
          } else {
            setFilteredRes(fuse.search(inputValue));
          }
        }}
        itemToString={item => (item ? item.name : '')}
        onOuterClick={() => setTotalSearchResults(null)}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          clearSelection,
          reset
        }) => {
          return (
            <div styles={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '50%',
                  position: 'relative'
                }}
              >
                <Input
                  disableUnderline={true}
                  className={styles.searchBox}
                  {...getInputProps({
                    onChange: e => {
                      if (e.target.value === '') {
                        clearSelection();
                      }
                    }
                  })}
                />
                <Clear
                  onClick={() => {
                    reset();
                    isOpen = true;
                  }}
                  className={styles.searchClearBtn}
                />
              </div>
              <ul className={styles.resultList} {...getMenuProps()}>
                {!items && (
                  <div>
                    <LinearProgress color="secondary" />
                  </div>
                )}
                {totalSearchResults && isOpen && (
                  <div className={styles.searchResultNoti}>
                    <span className={styles.resultNumber}>
                      {totalSearchResults}
                    </span>
                    <span> results.</span>
                  </div>
                )}
                {isOpen && items && filteredRes
                  ? filteredRes.map((item, index) => {
                      setTotalSearchResults(filteredRes.length);
                      return (
                        <Link to={item.route}>
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
                                fontWeight:
                                  selectedItem === item ? 'bold' : 'normal'
                              }
                            })}
                            className={styles.listItem}
                            target="_blank"
                            rel="nofollow"
                            pointer="cursor"
                          >
                            <ListItemText
                              style={{ textOverflow: 'ellipsis' }}
                              primary={
                                <ClampLines
                                  text={`${item.name} + ${item.meta}`}
                                  lines={2}
                                  moreText="..."
                                  innerElement="p"
                                />
                              }
                              pointer="cursor"
                            />
                          </ListItem>
                        </Link>
                      );
                    })
                  : null}
              </ul>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};
export default SearchInput;
