import React from 'react';
import { getCellById } from '../../utils/data';
import { Skeleton } from 'react-loading-skeleton';
import { Container } from '@material-ui/core';

export default function Post({ ...props }) {
  const id = props.match.params.postId;
  getCellById(id)
  const data = getCellById(id)
  const {name, meta, url, comments}=data
  return <Container>
        {!data && <Skeleton count={1} />}
        asdasd
      </Container>
}
