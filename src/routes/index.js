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
import GeneralLayout from '../components/GeneralLayout';
import SettingsCardsView from '../modules/settings/views/SettingsCardsView';
import UsersEditView from '../modules/users/views/UsersEditView';
import UsersEditViewContainer from '../modules/users/containers/UsersEditViewContainer';

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
      <GeneralLayout
        backText="Settings"
        backlink={SETTINGS}
        title="Users module"
      >
        <UsersListViewContainer>
          <UsersListingView />
        </UsersListViewContainer>
      </GeneralLayout>
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
      <GeneralLayout
        backText="Users list"
        backlink={USERS_LISTING}
        title="Edit users"
      >
        <UsersEditViewContainer>
          <UsersEditView />
        </UsersEditViewContainer>
      </GeneralLayout>
    )
  },
  {
    path: SETTINGS,
    key: 'Settings cards',
    content: <SettingsCardsView />
  }
];
