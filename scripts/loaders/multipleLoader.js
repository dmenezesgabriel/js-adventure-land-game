var aland_loader = {
  //web mode works in browsers and standalone
  //if you use github you have to use GITHUB PAGES
  use_web: true,
  base: "",
  //file mode works only in standalone
  //file mode example:
  //use_web:false,
  //base:"C:\adland_bot\",
  l: function (source) {
    var onerror = function () {
      log("loader failure: " + source, colors.code_error);
    };
    var library = document.createElement("script");
    library.type = "text/javascript";
    if (this.use_web) {
      library.src = this.base + source + "?now=" + Date.now();
      log("load_url: " + source);
    } else {
      var fs = require("fs");
      var data = fs.readFileSync(this.base + source, "utf8");
      library.text = data;
      log("load_file: " + source);
    }
    library.onerror = onerror;
    document.getElementsByTagName("head")[0].appendChild(library);
  },
};
aland_loader.l("parent.js");
