//  Todo figure it out how to use Sockets

import socketio from "socket.io-client";
export default class Character {
  pingNum = 1;

  constructor(serverData, characterId, userId, sessionCookie) {
    this.serverRegion = serverData.region;
    this.serverName = serverData.name;
    this.serverAddr = serverData.addr;
    this.serverPort = serverData.port;
    this.characterId = characterId;
    this.userId = userId;
    this.sessionCookie = sessionCookie;
    this.socket = {};
  }

  async connect() {
    console.debug(`Connecting to ${this.serverRegion}:${this.serverName}...`);
    console.debug(`Connecting to ${this.serverAddr}:${this.serverPort}...`);
    this.socket = socketio(`wss://${this.serverAddr}:${this.serverPort}`, {
      secure: true,
      transports: ["websocket"],
    });
    let socket = this.socket;
    let lasttime = new Date().getTime();
    // let original_onevent = socket.onevent;

    // socket.onevent = function (packet) {
    //   console.log("INCOMING", JSON.stringify(arguments) + " " + new Date());
    //   original_onevent.apply(socket, arguments);
    // };

    socket.on("welcome", (data) => {
      console.log("Socket loading");
      // Send a response that we're ready to go
      socket.emit("loaded", {
        success: 1,
        width: 1366,
        height: 768,
        scale: 10,
      });
    });

    // When we're loaded, authenticate
    socket.on("welcome", (data) => {
      console.log("Socket Authentication");

      socket.emit("auth", {
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

    socket.on("*", function (event, data) {
      console.log(event);
      console.log(data);
    });

    socket.on("ping_ack", function () {
      console.log("Ping acknowledged.");
    });

    socket.on("requesting_ack", () => {
      console.log("Request acknowledged.");
      socket.emit("requested_ack", {});
    });

    socket.on("connect", () => {
      console.log("Connected to server.");
    });

    socket.on("disconnect", () => {
      console.log(
        `Disconnected from server after ${
          Math.floor(new Date().getTime() - lasttime) / 1000
        } seconds.`
      );
    });

    setInterval(() => {
      console.log("One minute has passed.");
    }, 1000 * 60);

    setInterval(() => {
      console.log("Pinged.");
      socket.emit("ping_trig", {});
    }, 1000 * 30);

    // Send Heartbeat
    setInterval(() => {
      // Get the next pingID
      const pingID = this.pingNum.toString();
      this.pingNum++;

      // Get the ping
      console.log(`Sending Ping ${this.pingNum}`);
      this.socket.emit("ping_trig", { id: pingID });
      return pingID;
    }, 1000 * 3);
  }

  async disconnect() {
    console.debug(
      `Disconnecting from ${this.serverRegion}:${this.serverName}...`
    );
    this.socket.close();
  }
}
