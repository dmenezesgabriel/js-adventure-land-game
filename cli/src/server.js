import socketio from "socket.io-client";

export default class Server {
  constructor(serverData, reconnect = false) {
    this.serverRegion = serverData.region;
    this.serverName = serverData.name;
    this.serverAddr = serverData.addr;
    this.serverPort = serverData.port;

    this.socket = socketio(`ws://${serverData.addr}:${serverData.port}`);
  }

  async connect() {
    console.debug(`Connecting to ${this.serverRegion}:${this.serverName}...`);
    console.debug(`Connecting to ${this.serverAddr}:${this.serverPort}...`);
    this.socket;
  }

  async disconnect() {
    console.debug(
      `Disconnecting from ${this.serverRegion}:${this.serverName}...`
    );
    this.socket.close();
  }
}
