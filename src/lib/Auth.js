class Auth {

  // rewriting functions similar to satellizer from angular

  static logout() {
    localStorage.removeItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getPayload() {
    // check for a token
    const token = this.getToken();
    if (!token) return false;
    // check JWT token is valid
    const parts = token.split('.');
    if (parts.length < 3) return false;
    // atob decrypts the payload
    // json.parse turns it from a string into an object
    return JSON.parse(atob(parts[1]));
  }

  static isAuthenticated() {
    // check for a valid token
    const payload = this.getPayload();
    // check that it hasn't expired - get current time in seconds, payload.exp is in seconds
    const now = Math.round(Date.now() / 1000);
    // if payload time is greatre than current time, it hasn't expired yet
    return now < payload.exp;
  }

}

export default Auth;
