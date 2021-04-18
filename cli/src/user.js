import httpWrapper from "./httpWrapper.js";
import logger from "./logger.js";

// Auth
export default class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.sessionCookie = "";
    this.userId = "";
    this.characters = {};
  }

  setSession(session) {
    this.sessionCookie = session;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  async getSession() {
    // Login and save the auth
    logger.info(`Requesting "signup_or_login"`);
    const loginResponse = await httpWrapper.post(
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
      logger.info(`signup_or_login method response: ${loginMessage.message}`);
      for (const cookie of loginResponse.headers["set-cookie"]) {
        const result = /^auth=(.+?);/.exec(cookie);
        if (result) {
          // Save Session
          this.setUserId(result[1].split("-")[0]);
          this.setSession(result[1].split("-")[1]);
          break;
        }
      }
    } else if (loginMessage && loginMessage.message) {
      // Login failed, with reason
      logger.error(`Error at signup_or_login ${loginMessage.message}`);
      return Promise.reject(loginMessage.message);
    } else {
      // Login failed without a reason
      logger.error(`Error at signup_or_login ${loginResponse.data}`);
      return Promise.reject();
    }
  }

  async getCharacters() {
    if (!this.userId) return Promise.reject("You must login first.");
    logger.info(`Requesting servers_and_characters`);
    const charactersResponse = await httpWrapper.post(
      "servers_and_characters",
      "method=servers_and_characters&arguments={}",
      { headers: { cookie: `auth=${this.userId}-${this.sessionCookie}` } }
    );
    if (charactersResponse.status == 200) {
      for (const characterData of charactersResponse.data[0].characters) {
        this.characters[characterData.name] = characterData;
      }
      return Promise.resolve(true);
    } else {
      logger.error(`Error at servers_and_characters: ${charactersResponse}`);
    }

    return Promisse.reject("Error fetching characters");
  }

  async postCode() {}
}
