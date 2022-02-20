/* eslint-disable @typescript-eslint/no-var-requires */
// server.js
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./mock-server/oauth.json');
var middlewares = jsonServer.defaults();
var data = require('./mock-server/oauth.json');

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
	if (req.method === 'POST' && req.originalUrl === '/oauth/request_token') {
		return res.jsonp(data.request_token);
	}
	next();
});

server.use(router);
server.listen(4300, function () {
	console.log('JSON Server is running');
});
