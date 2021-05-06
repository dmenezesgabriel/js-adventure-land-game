/**
 * Fetch code from remote URL and run it.
 *
 * ⚠️ CAUTION -- Only use this with URLs you control and trust.
 * Untrusted code may hijack your account, use it to mine crypto currency,
 * steal personal data, cause your cat to run away and other nasty things.
 */

// urls to fetch code from
const urlList = [
  "https://dmenezesgabriel.github.io/adventure-land-journey/scripts/general.js",
  "https://dmenezesgabriel.github.io/adventure-land-journey/scripts/utils/observer.js",
];

urlList.forEach((url) => {
  const script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);
});
