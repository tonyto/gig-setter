$(document).ready(function() {
	$('.user-submit').click(function() {
		var data = $('.user').val();
		pusher.back_channel.trigger('join', data);
	})
});
