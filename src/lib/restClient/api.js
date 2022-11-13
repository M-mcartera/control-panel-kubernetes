import restClientBuilder from './restClientBuilder';
import serverSettings from '../../../server/settings/serverSettings';
import apiBuilder from '../apiBuilder/index';

const { apiBaseUrl } = serverSettings;

const api = apiBuilder({
  restClient: restClientBuilder({
    baseUrl: apiBaseUrl
  })
});

export const setApiAuthHeader = authToken => {
  if (authToken) {
    const authHeader = {
      Authorization: `Bearer ${authToken}`
    };

    api.setDefaultHeaders(authHeader);
  }
};

export default api;
