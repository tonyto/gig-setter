var express = require('express'),
	Pipe = require('pusher-pipe'),
	config = require('./config'),
	DictionaryChecker = require('./lib/dictionaryChecker').DictionaryChecker,
	eyes = require("eyes"),

	dictionaryChecker = new DictionaryChecker(),
    conversationStore = require('./lib/conversation-storer.js').conversationStore,
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

pipe.sockets.on('event:join-game', function(socket_id, data) {
	console.log(data);
	users.push(data);
	if (users.length === 1) {
		console.log('not enough players');
		pipe.socket(socket_id).trigger('waiting', {data: 'no users'});
	};
});

pipe.sockets.on('event:next-player', function(socket_id, data) {
	var current_player = users.indexOf(data.player);
		pipe.socket(users[current_player+1].s_id).trigger('your-turn', {player: users[current_player+1].player});
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
			currentPlayer: data.player === getNextPlayer(data.player),
            score: {'tony' : 0, 'Greg' : 10000},
			success: success
		});
	}
    
	if(conversationStore.checkForDuplicates(channel_name, data.word)) {
        respond(false); 
    } else {               
	    dictionaryChecker.check(data.word, respond);
    }
    
	//dictionaryChecker.check(data.word, respond);
}

function getNextPlayer(player) {
	var current_player_index = users.indexOf(player),
		current_player = users[(current_player_index + 1) % users.length];
	
	eyes.inspect(player);
	eyes.inspect(users);
	eyes.inspect(current_player_index);
	eyes.inspect(current_player);
	
	return current_player;
}

function getNextPlayer(player) {
	var current_player = users.indexOf(player);
	return users[current_player++ % users.length];
}
