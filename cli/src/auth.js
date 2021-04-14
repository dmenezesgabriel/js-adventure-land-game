import api from "./api.js";

// Auth
export default class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
    this.sessionCookie = "";
  }

  setSession(session) {
    this.sessionCookie = session;
  }

  getSession() {
    const formData = {
      email: this.email,
      password: this.password,
      only_login: true,
    };
    api.post("/signup_or_login").then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }
}
