var dictionaryUrl = dictionaryUrl = "http://www.google.com/dictionary/json?callback=a&q={q}&sl=en&tl=en&restrict=pr%2Cde&client=te",
	eyes = require("eyes"),
	restler = require("restler");

this.DictionaryChecker = function DictionaryChecker(rest){
	if (!this instanceof DictionaryChecker) {
		return new DictionaryChecker(rest);
	}

	rest = rest || restler; // allow DI
	var check = function (searchTerm, callback) {
			var searchUrl = dictionaryUrl.replace("{q}", searchTerm);
			rest.get(searchUrl).on("complete", function(data, request) {
				callback(data.length > 100);
			});
		};
	
	this.check = check;
};