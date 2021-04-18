import socketio from "socket.io-client";
import logger from "./logger.js";

export default class Character {
  pingNum = 1;

  constructor(serverData, characterData, userId, sessionCookie) {
    this.serverRegion = serverData.region;
    this.serverName = serverData.name;
    this.serverAddr = serverData.addr;
    this.serverPort = serverData.port;
    this.characterId = characterData.id;
    this.userId = userId;
    this.sessionCookie = sessionCookie;
    this.socket = {};
  }

  async connect() {
    logger.info(`Connecting to ${this.serverRegion}:${this.serverName}...`);
    logger.info(`Connecting to ${this.serverAddr}:${this.serverPort}...`);
    this.socket = socketio(`wss://${this.serverAddr}:${this.serverPort}`, {
      secure: true,
      transports: ["websocket"],
    });
    let lasttime = new Date().getTime();

    this.socket.on("welcome", (data) => {
      logger.info("Socket loading");
      // Send a response that we're ready to go
      this.socket.emit("loaded", {
        success: 1,
        width: 1366,
        height: 768,
        scale: 10,
      });
    });

    // When we're loaded, authenticate
    this.socket.on("welcome", (data) => {
      logger.info("Socket Authentication");

      this.socket.emit("auth", {
        auth: this.sessionCookie,
        character: this.characterId,
        height: 768,
        code_slot: this.characterId,
        no_graphics: "True",
        no_html: "1",
        passphrase: "",
        scale: 2,
        user: this.userId,
        width: 1366,
      });
    });

    // this.socket.on("start", (data) => {
    //   logger.info("Socket Start");

    //   this.socket.emit("code", {
    //     run: 1,
    //   });
    // });

    this.socket.on("ping_ack", function () {
      logger.info("Ping acknowledged.");
    });

    this.socket.on("requesting_ack", () => {
      logger.info("Request acknowledged.");
      this.socket.emit("requested_ack", {});
    });

    this.socket.on("connect", () => {
      logger.info("Connected to server.");
    });

    this.socket.on("disconnect", () => {
      logger.info(
        `Disconnected from server after ${
          Math.floor(new Date().getTime() - lasttime) / 1000
        } seconds.`
      );
    });

    this.socket.on("game_log", function (data) {
      logger.info(`Game log: ${data}`);
    });

    setInterval(() => {
      logger.info("One minute has passed.");
    }, 1000 * 60);

    setInterval(() => {
      logger.info("Pinged.");
      this.socket.emit("ping_trig", {});
    }, 1000 * 30);

    // Send Heartbeat
    setInterval(() => {
      // Get the next pingID
      const pingID = this.pingNum.toString();
      this.pingNum++;

      // Get the ping
      logger.info(`Sending Ping ${this.pingNum}`);
      this.socket.emit("ping_trig", { id: pingID });
      return pingID;
    }, 1000 * 3);
  }

  async disconnect() {
    logger.info(
      `Disconnecting from ${this.serverRegion}:${this.serverName}...`
    );
    this.socket.close();
  }
}
