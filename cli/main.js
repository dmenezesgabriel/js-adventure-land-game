require("dotenv").config();
// console.log(process.env.LOGIN);

// Auth
class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
    this.sessionCookie = "";
  }

  setSession(session) {
    this.sessionCookie = session;
  }
}
