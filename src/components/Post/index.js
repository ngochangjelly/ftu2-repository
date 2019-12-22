import React from 'react';
import {
  getCellById,
  stringToArr,
  nestedStringArrToArr, breakdownMetas
} from '../../utils/data';
import { Skeleton } from 'react-loading-skeleton';
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeftCircle, FiBookmark, FiSend} from 'react-icons/fi';

export default function Post({ ...props }) {
  let history = useHistory()
  const id = props.match.params.postId;
  const data = getCellById(id)[0];
  let { name, meta, url, comments } = data;
  comments = stringToArr(comments);
  url = nestedStringArrToArr(url);
  meta=breakdownMetas(meta);
  return (
    <div className={"post-container"}>
      {!data && <Skeleton count={1} />}
      <div className={'post-content-section'}>
        <Link to={'/'}>
          <FiArrowLeftCircle className={'backHomeBtn'} />
        </Link>
        <List>
          {url &&
            Array.from(url).map((item, key) => {
              const { name, link } = item;
              return (
                <ListItem
                  key={`${key}-${name}`}
                  button
                >
                  <ListItemIcon>
                    <FiBookmark />
                  </ListItemIcon>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <ListItemText
                      primary={
                        <div>
                          <span className={'materialTitle'}>{name} : </span>{' '}
                          <span className={'materialUrl'}>{link}</span>
                        </div>
                      }
                    />
                  </a>
                </ListItem>
              );
            })}
        </List>
      </div>
      <div className="post-comment-section">
        <div className="hashtag-section">
          {
            meta.map((item, key) => {
              return <div key={key} className="hashtag-pill">
                {item}
              </div>
            })
          }
        </div>
      <div className="comments-section">
          {comments.map((item, key) => {
            return <div key={`comment-${id}-${key}`} className="comment">
            {item}
          </div>
        })}
        </div>
        <div className="compose-comment">
          <textarea resize={'none'} placeholder={'Write your own review'} onFocus={() => {
            console.log('focus')
            document.getElementsByClassName("compose-comment")[0].height="100px"
          }} onChange={() => {
            console.log('chnage')
          }}></textarea>
        <FiSend/>
        </div>
      </div>
    </div>
  );
}
