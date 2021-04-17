import httpWrapper from "./httpWrapper.js";
import logger from "./logger.js";

export default class Game {
  constructor(sessionCookie, userId) {
    this.sessionCookie = sessionCookie;
    this.userId = userId;
    this.servers = {};
  }

  async getServers() {
    if (!this.userId) return Promise.reject("You must login first.");
    logger.info(`Getting Servers`);
    const serversResponse = await httpWrapper.post(
      "servers_and_characters",
      "method=servers_and_characters&arguments={}",
      { headers: { cookie: `auth=${this.userId}-${this.sessionCookie}` } }
    );
    if (serversResponse.status == 200) {
      for (const characterData of serversResponse.data[0].servers) {
        this.servers[characterData.name] = characterData;
      }
      return Promise.resolve(true);
    } else {
      console.error(serversResponse);
    }

    return Promisse.reject("Error fetching servers");
  }
}
