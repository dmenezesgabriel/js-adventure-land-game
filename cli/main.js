import dotenv from "dotenv";
import User from "./src/user.js";
import Game from "./src/game.js";
import logger from "./src/logger.js";
import Character from "./src/character.js";

logger.info("Hello Adventurer");
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const CHARACTER_NAME = process.env.CHARACTER_NAME;
const TARGET_SERVER_IDENTIFICATOR = process.env.TARGET_SERVER_IDENTIFICATOR;

let user = new User(EMAIL, PASSWORD);

logger.info("Getting session");
await user.getSession();
logger.info("Getting characters");
await user.getCharacters();

let game = new Game(user.sessionCookie, user.userId);
logger.info("Getting characters");
await game.getServers();

const targetServer = game.servers[TARGET_SERVER_IDENTIFICATOR];
const targetCharacter = user.characters[CHARACTER_NAME]["id"];
const userId = user.userId;
const sessionCookie = user.sessionCookie;

logger.info("Connecting character");

let character = new Character(
  targetServer,
  targetCharacter,
  userId,
  sessionCookie
);

//  Handle CTRL + C exit
process.on("SIGINT", function () {
  await character.disconnect();
});

logger.info("Connecting character");
try {
  // vincula o recurso
  await character.connect();
  logger.info("Character connected successfully");
} catch (error) {
  logger.error(`Error: ${error}`);
}
