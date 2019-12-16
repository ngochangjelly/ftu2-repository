import React from 'react';
import { getCellById } from '../../utils/data';
import { Skeleton } from 'react-loading-skeleton';
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {InsertLink} from '@material-ui/icons'
import styles from '../App.module.scss';

export default function Post({ ...props }) {
  const id = props.match.params.postId;
  getCellById(id);
  const data = getCellById(id)[0];
  let { name, meta, url, comments } = data;
  // url = JSON.parse(url)
  console.log(url)
  return (
    <Container>
      <div className={styles.postContainer}>
        {!data && <Skeleton count={1} />}
        <div className={styles.postContentSection}>
          <h3 className={styles.textPrimaryRed}>{name}</h3>
          <List>
            {url && Array.from(url).map((item, key) => {
              const {title, content}=item
              return (<ListItem
                key={key}
                button>
                <ListItemIcon>
                  {console.log(item)}
                <InsertLink />
              </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>)
            })}
          </List>
        </div>
        <div className={styles.postCommentSection}>
        </div>
      </div>
    </Container>
  );
}
