var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var routes = require('./routes');
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

io.sockets.on('connection', function(socket) {
	console.log('a user connected');
});

http.listen(app.get('port'), function() {
	console.log('listening on: localhost:' + app.get('port'));
});
