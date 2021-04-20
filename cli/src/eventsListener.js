import socketio from "socket.io-client";
import logger from "./logger.js";

export default class EventsListener {
  pingNum = 1;

  constructor(serverData) {
    this.serverRegion = serverData.region;
    this.serverName = serverData.name;
    this.serverAddr = serverData.addr;
    this.serverPort = serverData.port;
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

    this.socket.on("entities", (data) => {
      for (const player of data.players) {
        if ((player.id = "ThorinWise")) {
          console.log(data);
        }
      }
    });

    //  Sanity checks
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
