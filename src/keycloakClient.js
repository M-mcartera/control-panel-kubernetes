import Keycloak from 'keycloak-js';

const keycloakClient = new Keycloak({
  url: '',
  realm: '',
  clientId: ''
});

export default keycloakClient;
