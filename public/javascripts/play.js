$(function () {
	var 
		PlayView = Backbone.View.extend({
			el: "#footer",
			events: {
				"keyup input": "onKeyUp"
			},
			onKeyUp: function (e) {
				if(e.keyCode === 13) {
					pusher.back_channel.trigger("play", {word: e.currentTarget.value});
				}
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