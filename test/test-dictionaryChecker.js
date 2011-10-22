var DictionaryChecker = require("../lib/dictionaryChecker").DictionaryChecker,
	dictionaryUrl = "http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q={q}&sl=en&tl=en&restrict=pr%2Cde&client=te";

exports["calling check calls rest.get with correct parameters"] = function (test) {
	var calls = [],
		rest = {
			get: function () {
				calls.push(arguments);
			}
		},
		dictionaryChecker = new DictionaryChecker(rest),
		searchString = "blah",
		expectedUrl = dictionaryUrl.replace("{q}", searchString);
	
	dictionaryChecker.check(searchString);
	
	test.equal(calls.length, 1);
	test.equal(calls[0][0], expectedUrl); 
	
	test.done();
};

