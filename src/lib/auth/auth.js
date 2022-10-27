import { updateAbilities } from '../guards/abilities';

let userPermissions = [];

export const processToken = keycloakParsedToken => {
  const clientIds = [process.env.REACT_APP_KEYCLOAK_CLIENT_ID || ''];
  const machineNameRoles = Object.keys(keycloakParsedToken.resource_access)
    .filter(clientId => clientIds.includes(clientId))
    .reduce((allRoles, clientId) => {
      return [
        ...allRoles,
        ...(keycloakParsedToken.resource_access[clientId].roles || [])
      ];
    }, []);

  userPermissions = [...machineNameRoles];
  updateAbilities(machineNameRoles);
};

export const getPermissions = () => {
  return userPermissions;
};
