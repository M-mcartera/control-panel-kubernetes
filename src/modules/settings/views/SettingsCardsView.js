import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdManageSearch } from 'react-icons/md';
import { GrDeploy } from 'react-icons/gr';
import { SettingsCardComponent } from '../components/SettingsCardComponent';
import RefactoredGeneralLayout from '../../../components/RefactoredGeneralLayout';
import styled from 'styled-components';
import {
  GENERAL_SETTINGS,
  ROLES_LISTING,
  USERS_LISTING
} from '../../../routes/RoutePaths';
import Card from '../../../components/Card/Card';

const settingsCards = [
  {
    title: 'users',
    path: USERS_LISTING,
    description: 'Users management',
    icon: <FaUsers />
  },
  {
    title: 'roles',
    path: ROLES_LISTING,
    description: 'roles management',
    icon: <MdManageSearch />
  },
  {
    title: 'general',
    path: GENERAL_SETTINGS,
    description: 'General settings management',
    icon: <GrDeploy />
  }
];

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 50px;
  row-gap: 50px;
  ${Card} {
    width: 300px;
    height: auto;
  }
`;
const SettingsCardsView = () => {
  return (
    <RefactoredGeneralLayout title="Settings Modules">
      <CardsWrapper>
        {settingsCards.map(card => (
          <Card key={card.key}>
            <SettingsCardComponent
              path={card.path}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          </Card>
        ))}
      </CardsWrapper>
    </RefactoredGeneralLayout>
  );
};

export default SettingsCardsView;
