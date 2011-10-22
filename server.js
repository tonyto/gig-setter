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

<<<<<<< HEAD
app.get('/game', function(req, res){
  res.render('game', {
    title: 'game on sucker'
  });
=======

app.get('/play', function(req, res){  
    res.render('play',{
      title : 'WACADAY - MALLETS MALLET'
    });
>>>>>>> 7cadad43eb82b12e3100fa2e274ccd289a562d5f
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var pipe = Pipe.createClient({
    key: config.pusher.key,
    secret: config.pusher.secret,
    app_id: config.pusher.api_id,
    debug: true
});

pipe.connect();

pipe.sockets.on('event:create-game', function(socket_id, data) {
	console.log(data);
});

pipe.sockets.on('event:join-game', function(socket_id, data) {
	console.log(data);
});

//dynamic game name channel???
pipe.sockets.on('event:submit-word', function(socket_id, data) {
	console.log(data);
	//log it
	//broadcast to clients
	pipe.channel('my_channel').trigger('my_event', data)
});
