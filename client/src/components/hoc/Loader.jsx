import React from 'react';
import { Spinner } from 'reactstrap';

export default function Loader({ isLoading, children }) {
  if (isLoading) return <Spinner>Loading...</Spinner>;
  return children;
}
