const MAIN_URL = "http://127.0.0.1:5500/main.js";
let lastModified = null;

function updateScriptTag() {
  // Fetch the script with HEAD method to get the Last-Modified header
  fetch(MAIN_URL, { method: "HEAD" })
    .then((response) => {
      const newLastModified = response.headers.get("Last-Modified");
      if (newLastModified && newLastModified !== lastModified) {
        lastModified = newLastModified;
        // Remove the old script tag if it exists
        const oldScript = document.querySelector('script[src="' + MAIN_URL + '"]');
        if (oldScript) {
          oldScript.remove();
        }

        // Create a new `<script>` tag
        const script = document.createElement("script");
        //script.type = 'module';  // Uncomment for ES6 modules
        script.src = MAIN_URL;
        script.onerror = function (e) {
          set_message("Load Error", "red");
          log("Error loading remote script", "red");
        };

        // Add `<script>` tag to CODE iframe
        log("Loading " + MAIN_URL);
        document.head.appendChild(script);
      }
    })
    .catch((error) => {
      console.error("Error fetching Last-Modified:", error);
    });
}

// Call updateScriptTag() initially
updateScriptTag();

// Set the interval for updating the script tag (e.g., every 5 seconds)
const updateInterval = 1000 / 2;
setInterval(updateScriptTag, updateInterval);
