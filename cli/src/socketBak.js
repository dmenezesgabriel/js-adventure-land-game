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

    socket.on("server_info", (data) => console.log("serv_info " + data));

    socket.connect();

    console.log("done");
  }