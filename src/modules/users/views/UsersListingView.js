import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import SectionHeaderTitle from '../../../components/SectionHeaderTitle';
import AntdTable from '../../../components/Table';
import columnsConfig from '../configs/columnsConfig';
import { useHistory } from 'react-router-dom';
import { USERS_EDIT } from '../../../routes/RoutePaths';
import Card from '../../../components/Card/Card';
import { Modal } from 'antd';
import { RiAddLine } from 'react-icons/ri';

const UsersListingView = ({ onLoad, users, deleteUser }) => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  useEffect(() => {
    onLoad();
  }, []);

  const handleRowClick = (e, item) => {
    history.push(USERS_EDIT.replace(':id', item.username));
  };

  const onDelete = item => {
    setSelectedItem(item);
    setIsVisible(true);
  };
  if (isEmpty(users)) {
    return <></>;
  }
  return (
    <Card>
      <SectionHeaderTitle
        title="Users list"
        buttons={[
          {
            icon: <RiAddLine />,
            label: 'New user',
            onClick: () => {
              history.push(USERS_EDIT.replace(':id', 'new'));
            }
          }
        ]}
      />
      <AntdTable
        data={users}
        columnsConfig={columnsConfig(onDelete)}
        onRowClick={handleRowClick}
      />
      <Modal
        centered
        open={isVisible}
        onOk={() => {
          deleteUser(selectedItem.username);
          setSelectedItem({});
          setIsVisible(false);
        }}
        onCancel={() => {
          setIsVisible(false);
          setSelectedItem({});
        }}
      >
        Are you sure you want to remove {selectedItem.username} ?
      </Modal>
    </Card>
  );
};

export default UsersListingView;
