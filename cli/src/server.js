import socketio from "socket.io-client";

export default class Server {
  constructor(serverData, reconnect = false) {
    this.serverRegion = serverData.region;
    this.serverName = serverData.name;
    this.serverAddr = serverData.addr;
    this.serverPort = serverData.port;

    this.socket = socketio(`ws://${serverData.addr}:${serverData.port}`, {
      autoConnect: true,
      reconnection: true,
      transports: ["websocket"],
    });
  }

  async connect() {
    console.debug(`Connecting to ${this.serverRegion}:${this.serverName}...`);
    console.debug(`Connecting to ${this.serverAddr}:${this.serverPort}...`);
    this.socket.on("welcome", (data) => {
      console.log(data);
      console.log("success");
      this.socket.emit("loaded", {
        height: 1080,
        width: 1920,
        scale: 2,
        success: 1,
      });
    });
    this.socket.open();
  }

  async disconnect() {
    console.debug(
      `Disconnecting from ${this.serverRegion}:${this.serverName}...`
    );
    this.socket.close();
  }
}
