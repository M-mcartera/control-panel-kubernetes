import React from 'react';
import {
  HOME,
  USERS_EDIT,
  USERS_LISTING,
  USERS_NEW,
  SETTINGS
} from './RoutePaths';
import WelcomePage from '../pages/WelcomePage';
import UsersListViewContainer from '../modules/users/containers/UsersListViewContainer';
import UsersListingView from '../modules/users/views/UsersListingView';
import SettingsCardsView from '../modules/settings/views/SettingsCardsView';
import UsersEditView from '../modules/users/views/UsersEditView';
import UsersEditViewContainer from '../modules/users/containers/UsersEditViewContainer';
import RefactoredGeneralLayout from '../components/RefactoredGeneralLayout';

export default [
  {
    path: HOME,
    key: 'Home',
    content: <WelcomePage />
  },
  {
    path: USERS_LISTING,
    key: 'Users list',
    content: (
      <RefactoredGeneralLayout title="Users settings">
        <UsersListViewContainer>
          <UsersListingView />
        </UsersListViewContainer>
      </RefactoredGeneralLayout>
    )
  },
  {
    path: USERS_NEW,
    key: 'Users new',
    content: <h1>Users new</h1>
  },
  {
    path: USERS_EDIT,
    key: 'Users edit',
    content: (
      <RefactoredGeneralLayout title="Edit user">
        <UsersEditViewContainer>
          <UsersEditView />
        </UsersEditViewContainer>
      </RefactoredGeneralLayout>
    )
  },
  {
    path: SETTINGS,
    key: 'Settings cards',
    content: <SettingsCardsView />
  }
];
