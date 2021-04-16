import io from "socket.io-client";
export default class Character {
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
    this.socket = io(`wss://${this.serverAddr}:${this.serverPort}`, {
      secure: true,
      transports: ["websocket"],
    });

    let socket = this.socket.connect();
    let original_onevent = socket.onevent;

    socket.onevent = function (packet) {
      console.log("INCOMING", JSON.stringify(arguments) + " " + new Date());
      original_onevent.apply(socket, arguments);
    };

    socket.on("connect", function () {
      console.log("connected");
    });

    socket.on("welcome", (data) => {
      console.log("welcome " + data);
    });

    socket.emit("auth", {
      user: this.userId,
      character: this.characterId,
      code_slot: this.characterId,
      auth: this.sessionCookie,
      width: 768,
      height: 1366,
      no_html: "",
      passphrase: "",
      scale: "2",
      no_graphics: "",
    });

    socket.on("auth", (data) => {
      console.log("auth" + data);
    });

    socket.on("server_info", (data) => console.log("serv_info " + data));

    socket.connect();

    console.log("done");
  }

  async disconnect() {
    console.debug(
      `Disconnecting from ${this.serverRegion}:${this.serverName}...`
    );
    this.socket.close();
  }
}
