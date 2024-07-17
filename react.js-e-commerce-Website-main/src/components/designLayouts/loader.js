import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loader = ({ count = 1, height = 24, width = 100, circle = false }) => {
  return (
    <Skeleton count={count} height={height} width={width} circle={circle} />
  );
};

export default Loader;
