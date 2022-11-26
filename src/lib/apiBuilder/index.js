import usersRestClient from './users/index';
import rolesRestClient from './roles/index';

export default ({ restClient }) => ({
  setDefaultHeaders(headers = {}) {
    restClient.setDefaultHeaders(headers);
  },
  users: { ...usersRestClient(restClient) },
  roles: { ...rolesRestClient(restClient) }
});
