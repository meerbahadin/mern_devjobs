import React from 'react';
import './style.css';

const Spinner = ({loading}) => {
  return <div hidden={!loading} id="spinner"></div>;
};

export default Spinner;
