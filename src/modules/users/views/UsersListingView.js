import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';

const UsersListingView = ({ onLoad, users }) => {
  useEffect(() => {
    onLoad();
  }, []);
  if (isEmpty(users)) {
    return <></>;
  }
  return <h1>Log list users</h1>;
};

export default UsersListingView;
