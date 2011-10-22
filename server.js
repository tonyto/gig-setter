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
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var pipe = Pipe.createClient({
    key: config.key,
    secret: config.secret,
    app_id: config.app_id,
    debug: true
});

pipe.on('connected', function() {
	pipe.sockets.on('event:join', function(socket_id, data) {
		console.log('name');
	});
});

pipe.on('disconnected', function() {});
