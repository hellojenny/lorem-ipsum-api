var googlefonts = require("googlefonts").googlefonts;

var serverKey = "AIzaSyCBVaVxggj8mib-OLv_i7OXlRB51flPRz4";

module.exports = {
  allFonts: function() {
    return new Promise(function(resolve, reject) {
      var gfonts = new googlefonts(serverKey);

      gfonts.fetch(function(error, fonts) {
        if(typeof error !== "undefined") {
          throw error;
        }
        
        resolve(fonts); // returning a promise!
      });
    });
  }
}