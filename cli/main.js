import dotenv from "dotenv";
import User from "./src/user.js";
import Game from "./src/game.js";
import logger from "./src/logger.js";
import EventsListener from "./src/eventsListener.js";
import Character from "./src/character.js";

logger.info("Hello Adventurer");
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const CHARACTER_NAME = process.env.CHARACTER_NAME;
const TARGET_SERVER_IDENTIFICATOR = process.env.TARGET_SERVER_IDENTIFICATOR;

function sleep(seconds) {
  const ms = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let user = new User(EMAIL, PASSWORD);

logger.info("Getting session");
await user.getSession();
logger.info("Getting characters");
await user.getCharacters();

let game = new Game(user.sessionCookie, user.userId);
logger.info("Getting characters");
await game.getServers();

const targetServer = game.servers[TARGET_SERVER_IDENTIFICATOR];
const userId = user.userId;
const sessionCookie = user.sessionCookie;
const targetCharacter = user.characters[CHARACTER_NAME];

// logger.info("Connecting character");

// let character = new Character(
//   targetServer,
//   targetCharacter,
//   userId,
//   sessionCookie
// );

// //  Handle CTRL + C exit
// process.on("SIGINT", async () => {
//   await character.disconnect();
//   sleep(3);
//   process.exit();
// });

// logger.info("Connecting character");
// try {
//   await character.connect();
//   logger.info("Character connected successfully");
// } catch (error) {
//   logger.error(`Error: ${error}`);
// }

let eventsListener = new EventsListener(targetServer);
//  Handle CTRL + C exit
process.on("SIGINT", async () => {
  await eventsListener.disconnect();
  sleep(3);
  process.exit();
});

logger.info("Connecting eventListener");
try {
  // vincula o recurso
  await eventsListener.connect();
  logger.info("eventsListener connected successfully");
} catch (error) {
  logger.error(`Error: ${error}`);
}
