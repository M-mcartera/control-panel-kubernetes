const resourceUrl = '/users';
export default restClient => ({
  async listUsers() {
    return restClient.get(resourceUrl);
  }
});
