import api from "./api.js";

// Auth
export default class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.sessionCookie = "";
    this.userId = "";
  }

  setSession(session) {
    this.sessionCookie = session;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  async getSession() {
    // Login and save the auth
    console.info(`Logging in on behalf of ${this.email} ...`);
    const loginResponse = await api.post(
      "signup_or_login",
      `method=signup_or_login&arguments={"email":"${this.email}","password":"${this.password}","only_login":true}`
    );
    //  Checking if any data object has an message key
    let loginMessage;
    for (const responseItem of loginResponse.data) {
      if (responseItem.message) {
        loginMessage = responseItem;
        break;
      }
    }
    // Check if login was successful
    if (loginMessage && loginMessage.message == "Logged In!") {
      console.debug(loginMessage.message);
      for (const cookie of loginResponse.headers["set-cookie"]) {
        const result = /^auth=(.+?);/.exec(cookie);
        if (result) {
          // Save Session
          this.setSession(result[1].split("-")[0]);
          this.setUserId(result[1].split("-")[1]);
          break;
        }
      }
    } else if (loginMessage && loginMessage.message) {
      // Login failed, with reason
      console.error(loginMessage.message);
      return Promise.reject(loginMessage.message);
    } else {
      // Login failed without a reason
      console.error(loginResponse.data);
      return Promise.reject();
    }
  }
}
