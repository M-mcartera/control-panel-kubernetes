const resourceUrl = '/users';
export default restClient => ({
  async listUsers() {
    return restClient.get(resourceUrl);
  },
  async getUserDetails(username) {
    return restClient.get(`${resourceUrl}/${username}`);
  },
  async updateUser(username, data) {
    return restClient.post(`${resourceUrl}/${username}`, { payload: data });
  },
  async deleteUser(username) {
    return restClient.delete(`${resourceUrl}/${username}`);
  },
  async createUser(data) {
    return restClient.post(resourceUrl, { payload: data });
  }
});
