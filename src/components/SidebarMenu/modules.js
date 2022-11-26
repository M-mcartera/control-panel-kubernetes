import { FiSettings } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import React from 'react';

export default [
  {
    name: 'Home',
    path: '/',
    icon: <AiOutlineHome />
  },
  {
    name: 'Settings',
    icon: <FiSettings />,
    path: '/settings'
  }
];
