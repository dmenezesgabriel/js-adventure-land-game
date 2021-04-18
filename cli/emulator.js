import { chromium } from "playwright";
import dotenv from "dotenv";
import User from "./src/user.js";
import logger from "./src/logger.js";

dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const CHARACTERS = process.env.CHARACTERS.split(" ");

let user = new User(EMAIL, PASSWORD);
logger.info("Getting session");
await user.getSession();
await user.getCharacters();

// Deploy character
async function runCharacter(targetCharacterId, targetCharacterName) {
  logger.info(`Starting ${targetCharacterName}`);
  const opts = {
    // change here
    headless: true,
  };
  const browser = await chromium.launch(opts);
  const context = await browser.newContext();

  //
  // Auth
  //
  logger.info(`${targetCharacterName} - Auth`);
  const page = await context.newPage();
  await page.goto("https://adventure.land/");
  logger.info("Sleeping...");
  await sleep(5);
  logger.info(`${targetCharacterName} - Click login`);
  await page.evaluate(
    "$('#loginbuttons').hide(); $('#loginlogin').show(); on_resize()"
  );
  logger.info("Sleeping...");
  await sleep(2);
  await page.fill("#email2", EMAIL);
  await page.fill("#password2", PASSWORD);
  await page.evaluate(
    "api_call_l('signup_or_login',{email:$('#email2').val(),password:$('#password2').val(),only_login:true},{disable:$(this)})"
  );
  logger.info("Sleeping...");
  await sleep(2);

  (async () => {
    logger.info("Sleeping...");
    await sleep(5);
    page.close();
  })();

  //
  // Run
  //
  // NOTE: the loginJS can be extracted from the DOM of the browser.
  let characters = [
    {
      name: `${targetCharacterName}`,
      loginJS: `if(!observe_character('${targetCharacterName}')) log_in(user_id,${targetCharacterId},user_auth)`,
    },
  ];

  logger.info(`${targetCharacterName} - Login`);
  for (const char of characters) {
    const page = await context.newPage();
    await page.goto("https://adventure.land/");
    logger.info("Sleeping...");
    await sleep(5);
    await page.evaluate(char.loginJS); // select character
    logger.info("Sleeping...");
    await sleep(5);
    logger.info(`${targetCharacterName} - Escape`);
    await page.press("body", "Escape"); // close menu
    logger.info("Sleeping...");
    await sleep(1);
    logger.info(`${targetCharacterName} - Backslash - Running CODE`);
    await page.press("body", "Backslash"); // run code
    logger.info("Sleeping...");
    await sleep(3600);
  }
}

function sleep(seconds) {
  const ms = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  logger.info(`Deploy characters: ${CHARACTERS}`);
  for (let character in user.characters) {
    let targetCharacterId = user.characters[character]["id"];
    let targetCharacterName = user.characters[character]["name"];

    //  Check if character should be deployed
    if (CHARACTERS.includes(targetCharacterName)) {
      logger.info(`Deploy ${targetCharacterName}`);
      runCharacter(targetCharacterId, targetCharacterName);
    }
  }
}

main();
