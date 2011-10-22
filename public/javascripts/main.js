$(document).ready(function() {
//	$('.user-submit').click(function() {
//		var data = $('.user').val();
//		pusher.back_channel.trigger('join', data);
//	});
	
	window.Player = Backbone.Model.extend({
		defaults: function() {
			return {
				name: 'monkey',
				createdOn: new Date()
			}
		},
		
		initialize: function() {
		    console.log('hey Im new: ' + this.get('title'));
		}
	});
	
	window.ChallengeView = Backbone.View.extend({
		el: $('#player'),

		template: _.template($('#player-template').html()),

		initialize: function(player) {
			console.log('yoooooo');
			this.model = player
			this.render();
		},

		render: function() {
		    console.log(this.model.toJSON());
		    $(this.el).append(this.template(this.model.toJSON()));
		    return this;
		}
	});
	
	window.AppView = Backbone.View.extend({
		initialize: function () {
		    _.bind(this, "createPlayer");
		},

		events: {
		    "keypress .user-submit": "createPlayer"
		},
		
		createPlayer: function () {
			var text = $('.user').val();
			if (!text || e.keyCode != 13) return;
			pusher.back_channel.trigger('join', data);
		    var player = new Player({name: text});
		    new ChallengeView(player);
		}
	});

	window.App = new AppView;
});
