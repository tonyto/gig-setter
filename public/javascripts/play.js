$(function () {
	Pusher.host = "ws.darling.pusher.com";
	
	var pusher = new Pusher('8e801345847980cd1c0d'),

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
			}
		}),
		
		GameView = Backbone.View.extend({
			el: "#container",
			model: gameModel,
			
			initialize: function () {
				var self = this;
				_.bind(this, "onPlayed");
				
				channel.bind("played", function (data) {
					self.onPlayed(data);
				});
			},
			
			onPlayed: function(data){
				$(this.el).append("<blockquote class='" + 
				(data.success ? "success" : "fail") + 
				" " +
				(data.player === this.model.get("player") ? "self" : "opponent") + 
				"'><p>" + 
				data.word + 
				"</p></blockquote>");
			}
		}),
		
		playView = new PlayView,
		gameView = new GameView;
});