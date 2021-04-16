import { chromium } from "playwright";
import dotenv from "dotenv";
import User from "./src/user.js";
import Game from "./src/game.js";
import logger from "./src/logger.js";

dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const CHARACTER_NAME = process.env.CHARACTER_NAME;

let user = new User(EMAIL, PASSWORD);

logger.info("Getting session");
await user.getSession();
logger.info("Getting characters");
await user.getCharacters();
// logger.info(user.characters);

let game = new Game(user.sessionCookie, user.userId);
logger.info("Getting characters");

const targetCharacterId = user.characters[CHARACTER_NAME]["id"];
const targetCharacterName = user.characters[CHARACTER_NAME]["name"];

logger.info(`${targetCharacterName}`);
logger.info("start");

(async () => {
  const opts = {
    // change here
    headless: true,
  };
  const browser = await chromium.launch(opts);
  const context = await browser.newContext();

  //
  // Auth
  //
  logger.info("Auth");
  const page = await context.newPage();
  await page.goto("https://adventure.land/");
  await sleep(5);
  await page.evaluate(
    "$('#loginbuttons').hide(); $('#loginlogin').show(); on_resize()"
  );
  await sleep(2);
  await page.fill("#email2", EMAIL);
  await page.fill("#password2", PASSWORD);
  await page.evaluate(
    "api_call_l('signup_or_login',{email:$('#email2').val(),password:$('#password2').val(),only_login:true},{disable:$(this)})"
  );
  await sleep(2);
  (async () => {
    await sleep(5);
    page.close();
  })();

  //
  // Run
  //
  // NOTE: the loginJS can be extracted from the DOM of the browser.
  let characters = [
    {
      name: "yourcharname",
      loginJS: `if(!observe_character('${targetCharacterName}')) log_in(user_id,${targetCharacterId},user_auth)`,
    },
  ];

  logger.info("Login");
  for (const char of characters) {
    const page = await context.newPage();
    await page.goto("https://adventure.land/");
    await sleep(5);
    await page.evaluate(char.loginJS); // select character
    await sleep(5);
    await page.press("body", "Escape"); // close menu
    await sleep(1);
    await page.press("body", "Backslash"); // run code
    await sleep(3600);
  }
})();

function sleep(seconds) {
  const ms = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
