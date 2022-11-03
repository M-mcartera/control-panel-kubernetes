import Keycloak from 'keycloak-js';
import serverSettings from '../server/settings/serverSettings';

const keycloakClient = Keycloak({
  url: serverSettings.keycloakUrl,
  clientId: serverSettings.keycloakClientId,
  realm: serverSettings.keycloakRealm
});

export default keycloakClient;
