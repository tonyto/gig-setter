var sys = require('sys'),
    rest = require('restler'),
	baseurl = 'http://api.songkick.com/api/3.0/',
	config = ('./config');

function SongkickApi() {
	this.baseurl = 'http://api.songkick.com/api/3.0/';
	this.key = config.songkick;
}

module.exports = SongkickApi;

SongkickApi.prototype.getLocation = function (location) {
	rest.get('%jsearch/locations.json?query=%j&apikey=%j', this.baseurl, location, this.key).on('complete', function(data) {
		eyes.inspect(data);
	});
}
