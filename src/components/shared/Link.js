import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ to }) => {
  return <Link to={to} />;
};
export default CustomLink;
