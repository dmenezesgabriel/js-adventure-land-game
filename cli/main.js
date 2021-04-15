import dotenv from "dotenv";
import User from "./src/user.js";
import Game from "./src/game.js";

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let user = new User(email, password);

await user.getSession();
console.log(user.sessionCookie);
console.log(user.userId);
console.log("get characters");
await user.getCharacters();
console.log(user.characters);

let game = new Game(user.sessionCookie, user.userId);
await game.getServers();
console.log(game.servers);
