$(function () {
	var 
		PlayView = Backbone.View.extend({
			el: "#play",
			events: {
				"submit": "onSubmit"
			},
			onSubmit: function () {
				var input = $("input");
				pusher.back_channel.trigger("play", {word: input.val()});
				input.val("");
				return false;
			}
		}),
		
		GameView = Backbone.View.extend({
			el: "#container",
			
			initialize: function () {
				var self = this;
				_.bind(this, "onPlayed");
				
				pusher.back_channel.bind("played", function (data) {
					self.onPlayed(data);
				});
			},
			
			onPlayed: function(data){
				$(this.el).append("<blockquote class='oval-thought-border-left " + (data.success ? "success" : "fail") + "'><p>" + data.word + "</p></blockquote>");
			}
		}),
		
		playView = new PlayView,
		gameView = new GameView;
});