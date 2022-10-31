import { updateAbilities } from '../guards/abilities';
import serverSettings from '../../../server/settings/serverSettings';

let userPermissions = [];

export const processToken = keycloakParsedToken => {
  console.log(keycloakParsedToken);
  const clientIds = [serverSettings.keycloakClientId || ''];
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
