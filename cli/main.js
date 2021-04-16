import dotenv from "dotenv";
import User from "./src/user.js";
import Game from "./src/game.js";
import logger from "./src/logger.js";
import Server from "./src/server.js";
import Character from "./src/character.js";

logger.info("Hello Adventurer");
dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let user = new User(email, password);

logger.info("Getting session");
await user.getSession();
logger.info("Getting characters");
await user.getCharacters();
// console.log(user.characters);

let game = new Game(user.sessionCookie, user.userId);
logger.info("Getting characters");
await game.getServers();
// console.log(game.servers);

let currentServer = game.servers["III"];

logger.info("Connecting to server");
const server = new Server(currentServer);
server.connect();

let character = new Character(
  user.characters["Pumafang"]["id"],
  user.userId,
  user.sessionCookie,
  currentServer
);
logger.info("Connecting character");
character.connect();

// logger.info("Disconnecting from server");
// server.disconnect();
