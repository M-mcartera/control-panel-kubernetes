import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdManageSearch } from 'react-icons/md';
import { GrDeploy } from 'react-icons/gr';
import { SettingsCardComponent } from '../components/SettingsCardComponent';
import styled from 'styled-components';

const settingsCards = [
  {
    title: 'users',
    path: '/users',
    description: 'Users management',
    icon: <FaUsers />
  },
  {
    title: 'roles',
    path: '/roles',
    description: 'roles management',
    icon: <MdManageSearch />
  },
  {
    title: 'general',
    path: '/settings/general',
    description: 'General settings management',
    icon: <GrDeploy />
  }
];
const CardLayout = styled.div`
  display: flex;
  justify-content: space-around;
  column-gap: 20px;
  margin: 10px 50px;
`;
const SettingsCardsView = () => {
  return (
    <CardLayout>
      {settingsCards.map(card => (
        <SettingsCardComponent
          path={card.path}
          title={card.title}
          description={card.description}
          icon={card.icon}
          key={card.key}
        />
      ))}
    </CardLayout>
  );
};

export default SettingsCardsView;
