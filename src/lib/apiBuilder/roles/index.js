const resourceUrl = '/roles';

export default restClient => ({
  async listRoles() {
    return restClient.get(resourceUrl);
  },
  async getRole(rolename) {
    return restClient.get(`${resourceUrl}/${rolename}`);
  }
});
