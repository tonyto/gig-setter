$(function () {
	Pusher.host = "ws.darling.pusher.com";
	
	var pusher = new Pusher('8e801345847980cd1c0d'),

		eventAgg = _.extend({}, Backbone.Events),

		player = Math.random(),
	
		game = "foo",
		
		channel = pusher.subscribe(game),
	
		GameModel = Backbone.Model.extend({
			initialize: function () {
				this.set({
					game: game
				});
				_.bindAll(this, "onStartGame");
				_.bindAll(this, "onPlayed");
				_.bindAll(this, "onJoinExistingGame");
				channel.bind("startGame", this.onStartGame);
				channel.bind("played", this.onPlayed);
				channel.bind("joinExistingGame", this.onPlayed);
			},
			onStartGame: function (data) {
				console.log("gameModel.onStartGame");
				console.log(data);
				this.set({currentPlayer: data.currentPlayer});
				eventAgg.trigger("startGame");
				eventAgg.trigger("nextPlay", {
					isCurrentPlayer: this.get("player") === this.get("currentPlayer")
				});
			},
			onPlayed: function (data) {
				console.log("gameModel.onPlayed");
				console.log(data);
				this.set({currentPlayer: data.currentPlayer});
				eventAgg.trigger("nextPlay", {
					isCurrentPlayer: this.get("player") === this.get("currentPlayer")
				});
			},
			onJoinExistingGame: function (data) {
				console.log("gameModel.onJoinExistingGame");
				console.log(data);
				this.set({currentPlayer: data.currentPlayer});
				eventAgg.trigger("nextPlay", {
					isCurrentPlayer: this.get("player") === this.get("currentPlayer")
				});
			}
		}),
		
		gameModel = new GameModel,
		
		PlayView = Backbone.View.extend({
			el: "#footer",
			events: {
				"submit #play": "onSubmit"
			},
			initialize: function () {
				$(this.el).hide();
				_.bindAll(this, "onNextPlay");
				eventAgg.bind("nextPlay", this.onNextPlay);
			},
			model: gameModel,
			onSubmit: function () {
				console.log("playView.onsubmit");
				var input = this.$("input");
				channel.trigger("play", {
					word: input.val(),
					player: this.model.get("player"),
					game: this.model.get("game")
				});
				input.val("");
				return false;
			},
			onNextPlay: function (data) {
				console.log("playView.onNextPlay");
				console.log(data);
				if (data.isCurrentPlayer) {
					$(this.el).show();
				} else {
					$(this.el).hide();
				}
			}
		}),
		
		GameView = Backbone.View.extend({
			el: "#container",
			model: gameModel,
			
			initialize: function () {
				_.bindAll(this, "onPlayed");
				_.bindAll(this, "onStartGame");
				_.bindAll(this, "onWaiting");
				
				channel.bind("waiting", this.onWaiting);
				
				channel.bind("played", this.onPlayed);
				
				eventAgg.bind("startGame", this.onStartGame);
				$(this.el).hide();
			},
			
			onPlayed: function(data){
				console.log("gameView.onPlayed");
				console.log(data);
				var elements = "<blockquote class='" + 
					(data.success ? "success" : "fail") + 
					" " +
					(data.player === this.model.get("player") ? "self" : "opponent") + 
					"'><p>" + 
					data.word + 
					"</p><footer>" +
					data.player +
					"</footer></blockquote>";
				console.log(elements);
				$(this.el).prepend(elements);
			},
			
			onStartGame: function() {
				console.log("gameView.onStartGame");
				console.log("start game");
				this.$("h1").remove();
				$(this.el).show()
			},
			
			onWaiting: function(data) {
				console.log("gameView.onWaiting");
				console.log(data);
				$(this.el).append('<h1>waiting for players</h1>');
			}
		}),
		
		PlayerView = Backbone.View.extend({
			el: "#player",
			model: gameModel,
			
			events: {
				"submit #player-form": "onSubmit"
			},
			
			initialize: function () {
				_.bindAll(this, "onSubmit");
			},
			
			onSubmit: function () {
				console.log("playerView.onSubmit");
				var player = this.$('input').val();
				if(player) {
					channel.trigger("join-game", {player: player});
					this.model.set({player: player});
					$(this.el).hide();
				};
				return false;
			}
		}),
		
		playerView = new PlayerView,
		
		playView = new PlayView,
		gameView = new GameView;
});