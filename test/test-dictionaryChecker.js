var DictionaryChecker = require("../lib/dictionaryChecker").DictionaryChecker,
	eyes = require("eyes"),
	dictionaryUrl = "http://www.google.com/dictionary/json?callback=a&q={q}&sl=en&tl=en&restrict=pr%2Cde&client=te";

exports["calling check calls rest.get with correct parameters"] = function (test) {
	var calls = [],
		rest = {
			get: function () {
				calls.push(arguments);
				return {
					on: function () {}
				}
			}
		},
		dictionaryChecker = new DictionaryChecker(rest),
		searchString = "blah",
		expectedUrl = dictionaryUrl.replace("{q}", searchString);
	
	dictionaryChecker.check(searchString, function(){});
	
	test.equal(calls.length, 1);
	test.equal(calls[0][0], expectedUrl); 
	
	test.done();
};

exports["calling google's api for a known word calls through with value true"] = function (test) {
	var dictionaryChecker = new DictionaryChecker,
		actualValue,
		calls = [],
		callback = function (success) {
			test.equal(success, true);
			test.done();
		},
		result = dictionaryChecker.check("kitten", callback);
};

exports["calling google's api for an unknown word calls through with value false"] = function (test) {
	var dictionaryChecker = new DictionaryChecker,
		actualValue,
		calls = [],
		callback = function (success) {
			test.equal(success, false);
			test.done();
		},
		result = dictionaryChecker.check("qwepoiufvlkhjqwerliuy", callback);
};