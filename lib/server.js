var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var basedir = path.join(__dirname, '..');
var util = require('util');
var WebSocketServer = require("ws").Server; // add

var httpServer = http.createServer(app); // add
var wss = new WebSocketServer({server:httpServer}); // add
var connects = []; // add

app.configure(function () {
	app.set('view engine', 'jade');
	app.set('views', path.join(basedir, '/template/jade'));
	app.use(express['static'](path.join(basedir + '/public')));
	app.set('port', 8888);
});

// routing
app.get('/', function (req, res) {
	res.render('user');
});

app.get('/main', function (req, res) {
	res.render('main');
});

// require('./web/').register(app);

// app.listen(8888);
// console.log('Listening on port 8888');

// var server = http.createServer(app).listen(app.get('port'), function () {
// 	console.log(util.format('Express server listening on port: %s', app.get('port')));
// });
// var io = require('socket.io').listen(server);

wss.on("connection", function(ws){
  console.log("established websocket connection");
  connects.push(ws);
  ws.on("message", function(data, flag){
  	console.log("message ok");

  	var parsedData = JSON.parse(data);
    var dataId = parsedData.id;
    console.log(dataId);

    if (dataId === "game.locate") {
    	console.log(parsedData);
    	broadcast(JSON.stringify(parsedData));
    }
  });
});

function broadcast (message) {
    connects.forEach(function (socket, i) {
        socket.send(message);
    });
}

//httpServer, websocketServerを起動する
httpServer.listen(app.get("port"), function(){
  console.log("Express server listening on port" + app.get("port"));
});


// io.sockets.on('connection', function (socket) {
// 	console.log('-----connected-----');
// 	// socket.on('msg send', function () {

// 	// });
// 	socket.emit('message', { msg: 'you connect !!' });
// 	socket.on('devicemotion', function (e) {
// 		console.log('devicemotion');
// 		console.log(e);
// 		socket.broadcast.emit('devicemotion', e);
// 	});
// 	socket.on('disconnect', function () {
// 		console.log('-----disconnected-----');
// 	});
// });