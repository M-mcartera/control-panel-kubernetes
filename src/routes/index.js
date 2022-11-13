import React from 'react';
import { HOME, USERS_EDIT, USERS_LISTING, USERS_NEW } from './RoutePaths';
import WelcomePage from '../pages/WelcomePage';
import UsersListViewContainer from '../modules/users/containers/UsersListViewContainer';
import UsersListingView from '../modules/users/views/UsersListingView';
import GeneralLayout from '../components/GeneralLayout';

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
      <GeneralLayout>
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
    content: <h2>Users edit</h2>
  }
];
