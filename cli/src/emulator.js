import { chromium } from "playwright";

const USERNAME = "your.email@here.example";
const PASSWORD = "yourPassHere";

(async () => {
  const opts = {
    // change here
    headless: false,
  };
  const browser = await chromium.launch(opts);
  const context = await browser.newContext();

  //
  // Auth
  //
  const page = await context.newPage();
  await page.goto("https://adventure.land/");
  await sleep(5);
  await page.evaluate(
    "$('#loginbuttons').hide(); $('#loginlogin').show(); on_resize()"
  );
  await sleep(2);
  await page.fill("#email2", USERNAME);
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
      loginJS:
        "if(!observe_character('yourcharname')) log_in(user_id,'0000000000000000',user_auth)",
    },
  ];

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
