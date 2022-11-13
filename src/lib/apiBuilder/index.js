import usersRestClient from './users/index';

export default ({ restClient }) => ({
  setDefaultHeaders(headers = {}) {
    restClient.setDefaultHeaders(headers);
  },
  users: { ...usersRestClient(restClient) }
});
