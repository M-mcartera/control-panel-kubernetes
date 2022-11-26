export default class UserIdentity {
  constructor() {
    this.token = '';
    this.username = '';
    this.roles = '';
  }

  processToken(token) {
    this.token = token;
    this.username = token.username;
  }

  getUsername() {
    return this.username;
  }
}
