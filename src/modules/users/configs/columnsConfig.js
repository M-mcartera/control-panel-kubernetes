import React from 'react';
import { format } from 'date-fns';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FaTimesCircle } from 'react-icons/fa';
import styled from 'styled-components';
import DeleteButton from '../../../components/Buttons/DeleteButton';

const Icon = styled.span`
  color: ${({ enabled }) => (enabled ? 'green' : 'red')};
  width: 100%;
  height: 100%;
  text-align: center;
`;
export default onDelete => [
  {
    title: 'Username',
    key: 'username',
    align: 'center',
    dataIndex: 'username',
    render: data => <span>{data}</span>
  },
  {
    title: 'Email',
    key: 'email',
    align: 'center',
    dataIndex: 'email',
    render: data => <span>{data}</span>
  },
  {
    title: 'Verified',
    key: 'emailVerified',
    align: 'center',
    dataIndex: 'emailVerified',
    render: data => {
      return data ? (
        <Icon enabled={data}>
          <AiFillCheckCircle />
        </Icon>
      ) : (
        <Icon enabled={data}>
          <FaTimesCircle />
        </Icon>
      );
    }
  },
  {
    title: 'Roles',
    key: 'roles',
    align: 'center',
    dataIndex: 'roles',
    render: data => <span>{data.join(',')}</span>
  },
  {
    title: 'Created at',
    key: 'createdAt',
    align: 'center',
    dataIndex: 'createdTimestamp',
    render: data => <span>{format(new Date(data), 'EEEE io, yyyy')}</span>
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'center',
    render: item => {
      return (
        <DeleteButton
          onDelete={() => {
            onDelete(item);
          }}
        />
      );
    }
  }
];
