import jsdom from "jsdom";

let virtualConsole = new jsdom.VirtualConsole();

const resourceLoader = new jsdom.ResourceLoader({
  strictSSL: false,
  userAgent:
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
});

const options = {
  resources: resourceLoader,
  runScripts: "dangerously",
  pretendToBeVisual: true,
  virtualConsole: new jsdom.VirtualConsole(),
  cookieJar: new jsdom.CookieJar(),
};
// options.cookieJar.setCookieSync();
jsdom.JSDOM.fromURL("https://adventure.land", options).then((dom) => {
  virtualConsole.sendTo(console);
  virtualConsole.on("error", (data) => {
    console.log(data);
  });
  virtualConsole.on("warn", (data) => {
    console.log(data);
  });
  virtualConsole.on("info", (data) => {
    console.log(data);
  });
  virtualConsole.on("dir", (data) => {
    console.log(data);
  });

  //   console.log(dom.window.document.body.innerHTML);
});
