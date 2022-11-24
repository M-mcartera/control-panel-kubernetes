const resourceUrl = '/users';
export default restClient => ({
  async listUsers() {
    return restClient.get(resourceUrl);
  },
  async getUserDetails(username) {
    return restClient.get(`${resourceUrl}/${username}`);
  }
});
