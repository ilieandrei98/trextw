const http = require('http');

http.ServerResponse.prototype.json = function(content){
    this.setHeader('Content-type', 'application/json');
    this.end(JSON.stringify(content));
};

http.ServerResponse.prototype.error = function(content){
    this.statusCode = 500;
    this.json(content);
};

http.ServerResponse.prototype.notFound = function(content){
    this.statusCode = 404;
    this.json(content);
};