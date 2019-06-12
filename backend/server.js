/*
Root imports
*/
const http = require("http");
const config = require("./config");
const router = require("./src/router");
const server = http.createServer(function(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
});

/*
Base router initialization
*/
const app = new router(server);

/*
Microservices
*/
// require('./src/searchMicroservice/api/service')(app);
require("./src/groupsMicroservice/api/service")(app);
require("./src/authentication/api/authenticationApi")(app);
require("./src/searchMicroservice/api/searchApi")(app);
require("./src/tagsMicroservice/api/tagsApi")(app);
require('./src/groupsMicroservice/api/service')(app);
/*
Utils
*/
require("./src/utils/stringExtensions");
require("./src/utils/responseExtensions");
require("./src/utils/arrayExtensions");

server.listen(config.port, config.host, function() {
  console.log("Listening on " + config.host + ":" + config.port + "...");
});
