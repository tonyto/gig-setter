var express = require('express'),
	Pipe = require('pusher-pipe'),
	config = require('./config');


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


app.get('/play', function(req, res){  
    res.render('play',{
      title : 'WACADAY - MALLETS MALLET'
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var pipe = Pipe.createClient({
    key: ENV['PUSHER_KEY'] || config.pusher.key,
    secret: ENV['PUSHER_SECRET'] || config.pusher.secret,
    app_id: ENV['PUSHER_API_ID'] || config.pusher.api_id,
    debug: ENV['PUSHER_DEBUG'] || true
});

pipe.connect();

pipe.sockets.on('event:create-game', function(socket_id, data) {
	console.log(data);
});

pipe.sockets.on('event:join-game', function(socket_id, data) {
	console.log(data);
});

pipe.sockets.on('event:play', function(socket_id, data) {
	console.log(data);
	pipe.socket(socket_id).trigger("played", data);
});