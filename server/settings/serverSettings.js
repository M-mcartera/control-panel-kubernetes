import parseEnv from './parseEnv';

export default {
  developerMode: parseEnv('DEVELOPER_MODE', 'boolean'),

  keycloakUrl: parseEnv('KEYCLOAK_URL'),
  keycloakRealm: parseEnv('KEYCLOAK_REALM'),
  keycloakClientId: parseEnv('KEYCLOAK_CLIENT_ID'),
  keycloakOnLoad: parseEnv('KEYCLOAK_ON_LOAD')
};
