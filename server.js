var express = require('express'),
	Pipe = require('pusher-pipe'),
	config = require('./config'),
	DictionaryChecker = require('./lib/dictionaryChecker').DictionaryChecker,
	eyes = require("eyes"),

	dictionaryChecker = new DictionaryChecker(),
    conversationStore = require('./lib/conversation-storer.js').conversationStore,
	app = module.exports = express.createServer(),
	current_player,
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
      title : 'WACADAY - MALLETS MALLET'
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

pipe.channels.on('event:join-game', function(channel_name, socket_id, data) {
	eyes.inspect(arguments);
	if(users.indexOf(data.player) === -1) {
		console.log("User " + data.player + " not yet in the game. Adding.");
		users.push(data.player);
	} else {
		console.log("User " + data.player + " already in the game");	
	}
	eyes.inspect(users);
	if (users.length <= 1) {
		console.log('not enough players');
		pipe.channel(channel_name).trigger('waiting', {});
	} else if (users.length === 2) {
		console.log("Two players; start game");
		console.log("Current player: " + getNextPlayer());
		pipe.channel(channel_name).trigger("startGame", {currentPlayer: current_player});
	} else {
		console.log("More than two players; join existing game");
		pipe.channel(channel_name).trigger("joinExistingGame", {currentPlayer: current_player});
	}
});

pipe.channels.on('event:play', onEventPlay);

function onEventPlay(channel_name, socket_id, data) {
	eyes.inspect(arguments);
	eyes.inspect(pipe.sockets);
	
	function respond(success){
        var score = success ? 1 : -5;
        var conversation = conversationStore.addWord(channel_name, data.player, data.word, score);
        eyes.inspect(conversation);
                
		data.success = success;
		pipe.channel(channel_name).trigger("played", {
			word: data.word,
			player: data.player,
			currentPlayer: getNextPlayer(),
            score: conversationStore.getCurrentScores(channel_name),
			success: success
		});
	}
    
	if(conversationStore.checkForDuplicates(channel_name, data.word)) {
        respond(false); 
    } else {               
	    dictionaryChecker.check(data.word, respond);
    }
}

function getNextPlayer() {
	var index;

	if(current_player === undefined) {
		current_player = users[0];
		return current_player;
	}
	
	index = users.indexOf(current_player);
	
	current_player = users[(index + 1) % users.length];
	
	console.log("Current player found");
	eyes.inspect(current_player);
	
	return current_player;
}
