$(function () {
	Pusher.host = "ws.darling.pusher.com";
	
	var pusher = new Pusher('8e801345847980cd1c0d'),

		eventAgg = _.extend({}, Backbone.Events),

		player = Math.random(),
	
		game = "blah",
		
		channel = pusher.subscribe(game),
	
		GameModel = Backbone.Model.extend({
			initialize: function () {
				this.set({
					player: player,
					currentPlayer: player,
					game: game
				});
			}
		}),
		
		gameModel = new GameModel,
		
		PlayView = Backbone.View.extend({
			el: "#play",
			events: {
				"submit": "onSubmit"
			},
			initialize: function () {
				$(this.el).hide();
				_.bindAll(this, "onStartGame");
				eventAgg.bind("startGame", this.onStartGame);
			},
			model: gameModel,
			onSubmit: function () {
				var input = $("input");
				channel.trigger("play", {
					word: input.val(),
					player: this.model.get("player"),
					game: this.model.get("game")
				});
				input.val("");
				return false;
			},
			onStartGame: function () {
				$(this.el).show();
			}
		}),
		
		GameView = Backbone.View.extend({
			el: "#container",
			model: gameModel,
			
			initialize: function () {
				var self = this;
				_.bindAll(this, "onPlayed");
				_.bindAll(this, "onStartGame");
				
				channel.bind("played", function (data) {
					self.onPlayed(data);
				});
				
				eventAgg.bind("startGame", this.onStartGame);
				$(this.el).hide();
			},
			
			onPlayed: function(data){
				$(this.el).append("<blockquote class='" + 
				(data.success ? "success" : "fail") + 
				" " +
				(data.player === this.model.get("player") ? "self" : "opponent") + 
				"'><p>" + 
				data.word + 
				"</p></blockquote>");
			},
			
			onStartGame: function() {
				console.log("start game");
				$(this.el).show()
			}
		}),
		
		PlayerView = Backbone.View.extend({
			el: "#player",
			
			events: {
				"submit #player-form": "onJoinedGame"
			},
			
			initialize: function () {
				_.bindAll(this, "onJoinedGame");
				_.bindAll(this, "onStartGame");
				eventAgg.bind("startGame", this.onStartGame);
			},
			
			onJoinedGame: function (e) {
				var text = $('.user').val();
				if(text) {
					var self = this;
				
					pusher.back_channel.bind("joinedGame", function (data) {
						self.joinedGame(data);
					});
					
					//trigger event
					eventAgg.trigger("startGame");
				};
				return false;
			},
			onStartGame: function () {
				$(this.el).hide();
			}
		}),
		
		playerView = new PlayerView,
		
		playView = new PlayView,
		gameView = new GameView;
});