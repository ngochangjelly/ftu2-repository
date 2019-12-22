import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import Fuse from 'fuse.js';
import {
  ListItem,
  ListItemText,
  Input,
  CircularProgress
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import ClampLines from 'react-clamp-lines';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const opts = { name: 'name', meta: 'meta' };

const SearchInput = ({ data }) => {
  let history = useHistory();
  const [totalSearchResults, setTotalSearchResults] = useState(null);
  let [filteredRes, setFilteredRes] = useState(null);
  const options = { keys: [opts.name, opts.meta] };
  const fuse = new Fuse(data, options);
  const items = data;

  const handleSelect = selectedItem => {
    selectedItem && history.push(`post/${selectedItem.route}`);
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
                  marginTop: '40%',
                  position: 'relative',
                }}
              >
                <Input
                  disableUnderline={true}
                  className={'searchBox'}
                  {...getInputProps({
                    onChange: e => {
                      if (e.target.value === '') {
                        clearSelection();
                      } else {
                        console.log('input not empty')
                      }
                    }
                  })}
                />
                <Clear
                  onClick={() => {
                    reset();
                    isOpen = true;
                  }}
                  className={'searchClearBtn'}
                />
              </div>
              <ul className={'resultList'} {...getMenuProps()}>
                {!items && (
                  <div className={'loadingIcon'}>
                    <CircularProgress color="secondary"/>
                  </div>
                )}
                {totalSearchResults && isOpen && (
                  <div className={'searchResultNoti'}>
                    <span className={'resultNumber'}>
                      {totalSearchResults}
                    </span>
                    <span> results.</span>
                  </div>
                )}
                {isOpen && items && filteredRes
                  ? filteredRes.map((item, index) => {
                      setTotalSearchResults(filteredRes.length);
                      return (
                        <Link key={index} to={`post/${item.route}`}>
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
                            className={'listItem'}
                            target="_blank"
                            rel="nofollow"
                            pointer="cursor"
                          >
                            <ListItemText
                              style={{ textOverflow: 'ellipsis' }}
                              primary={item.name}
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
