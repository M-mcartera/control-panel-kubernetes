import { useContext } from 'react';
import KeycloakContext from '../KeycloakContext';
import { isEmpty } from 'lodash';

export default () => {
  const { token } = useContext(KeycloakContext);
  const userPermissions =
    token?.resource_access[process.env.REACT_APP_KEYCLOAK_CLIENT_ID]?.roles ||
    [];

  if (isEmpty(userPermissions)) {
    return [];
  }

  const modules = [];

  return modules;
};
