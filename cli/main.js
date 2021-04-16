import dotenv from "dotenv";
import User from "./src/user.js";
import Game from "./src/game.js";
import logger from "./src/logger.js";
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

const targetServer = game.servers["III"];
const targetCharacter = user.characters["Pumafang"]["id"];
const userId = user.userId;
const sessionCookie = user.sessionCookie;

logger.info("Connecting character");

let character = new Character(
  targetServer,
  targetCharacter,
  userId,
  sessionCookie
);
logger.info("Connecting character");
character.connect();
