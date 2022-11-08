import { FaUsers } from 'react-icons/fa';
import React from 'react';

export default [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Users',
    icon: <FaUsers />,
    subMenuItems: [
      {
        name: 'View users',
        path: '/users'
      },
      {
        name: 'Add users',
        path: '/users/new'
      },
      { name: 'Edit users', path: '/users/:id/details' }
    ]
  }
];
