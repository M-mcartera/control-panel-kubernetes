import React, { useEffect } from 'react';

const UsersEditView = ({ onLoad }) => {
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <h1>edit user</h1>
    </>
  );
};

export default UsersEditView;
