const url = require('url');
const ObjectId = require('mongoose').Types.ObjectId;
var handlers = {
    notFound: function(req, res){
        const notFound = {
            error: "Route not found"
        }
        res.end(JSON.stringify(notFound));
    }
};

var router = function (server) {
    server.on('request', function (req, res) {
        const parsedUrl = url.parse(req.url);
        var path = parsedUrl.path;
        const method = req.method;
        const query = url.query;
        const urlPaths = path.split('/');

        req.params = [];

        for(let i = 0 ; i< urlPaths.length; i++){
            if(ObjectId.isValid(urlPaths[i])){
                req.params.push(urlPaths[i]);                
                urlPaths[i] = ":id";
            }
        }

        path = urlPaths.join("/");

        var body = "";

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            if(body.isValidJSON()){
                req.body = JSON.parse(body);
            }
            if (handlers[path] && handlers[path][method]) {
                const handler = handlers[path][method];

                handler(req, res);
            }
            else{
                handlers['notFound'](req, res);
            }
        });
    });
}

router.prototype = {
    get: function (path, handler) {
        if (!handlers[path]) {
            handlers[path] = [];
        }
        handlers[path]['GET'] = handler;
    },
    post: function (path, handler) {
        if (!handlers[path]) {
            handlers[path] = [];
        }
        handlers[path]['POST'] = handler;
    },
    put: function (path, handler) {
        if (!handlers[path]) {
            handlers[path] = [];
        }
        handlers[path]['PUT'] = handler;
    },
    delete: function (path, handler) {
        if (!handlers[path]) {
            handlers[path] = [];
        }
        handlers[path]['DELETE'] = handler;
    }
};

module.exports = function (server) {
    return new router(server);
};