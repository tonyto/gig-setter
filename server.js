var express = require('express'),
	Pipe = require('pusher-pipe'),
	config = require('./config'),
	DictionaryChecker = require('./lib/dictionaryChecker').DictionaryChecker,
	eyes = require("eyes"),

	dictionaryChecker = new DictionaryChecker,
	app = module.exports = express.createServer(),
	users = [];
	
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
    res.render('play',{
      title : "WACADAY - MALLETT'S MALLET"
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var pipe = Pipe.createClient({
    key: process.env.PUSHER_KEY || config.pusher.key,
    secret: process.env.PUSHER_SECRET || config.pusher.secret,
    app_id: process.env.PUSHER_API_ID || config.pusher.api_id,
    debug: process.env.PUSHER_DEBUG || true
});

pipe.connect();

pipe.sockets.on('event:join-game', function(socket_id, data) {
	console.log(data);
	users.push(data);
});

pipe.channels.on('event:play', onEventPlay);

function onEventPlay(channel_name, socket_id, data) {
	eyes.inspect(arguments);
	eyes.inspect(pipe.sockets);
	
	function respond(success){
		data.success = success;
		pipe.channel(channel_name).trigger("played", {
			word: data.word,
			player: data.player,
			currentPlayer: data.player === "bnathyuw" ? "tony" : "bnathyuw",
			success: success
		});
	}
	
	dictionaryChecker.check(data.word, respond);
}
