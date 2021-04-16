import Server from "./server.js";

export default class Character {
  constructor(characterId, userId, sessionCookie, socket) {
    this.characterId = characterId;
    this.userId = userId;
    this.sessionCookie = sessionCookie;
    this.socket = socket;
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
