import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import SectionHeaderTitle from '../../../components/SectionHeaderTitle';
import AntdTable from '../../../components/Table';
import columnsConfig from '../configs/columnsConfig';
import { useHistory } from 'react-router-dom';
import { USERS_EDIT } from '../../../routes/RoutePaths';

const UsersListingView = ({ onLoad, users }) => {
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  const handleRowClick = (e, item) => {
    history.push(USERS_EDIT.replace(':id', item.username));
  };

  const onDelete = item => {
    console.log({ item });
  };
  if (isEmpty(users)) {
    return <></>;
  }
  return (
    <>
      <SectionHeaderTitle title="Users list" />
      <AntdTable
        data={users}
        columnsConfig={columnsConfig(onDelete)}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default UsersListingView;
