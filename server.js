/*
Root imports
*/
const http = require('http');
const config = require('./config');
const router = require('./src/router');
const server = http.createServer();

/*
Base router initialization
*/
const app = new router(server);

/*
Microservices
*/
require('./src/searchMicroservice/api/service')(app);
/*
Utils
*/
require('./src/utils/stringExtensions');

server.listen(config.port, config.host, function() {
   console.log("Listening on " + config.host + ":" + config.port + "..."); 
});

