import Server from "./server.js";

export default class Character extends Server {
  constructor(characterId, userId, sessionCookie, serverData) {
    super(serverData);
    this.characterId = characterId;
    this.userId = userId;
    this.sessionCookie = sessionCookie;
  }
  // Connect
  // Disconnect
  async connect() {
    this.socket.on("welcome", () => {
      this.socket.emit("auth", {
        auth: this.sessionCookie,
        character: this.characterId,
        height: 1080,
        no_graphics: "True",
        no_html: "1",
        passphrase: "",
        scale: 2,
        user: this.userId,
        width: 1920,
      });
    });
    socket.open();
  }
}
