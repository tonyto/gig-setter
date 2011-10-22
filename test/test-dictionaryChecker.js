var DictionaryChecker = require("../lib/dictionaryChecker").DictionaryChecker;

exports["calling check calls http"] = function (test) {
	var calls = [],
		http = {
			cat: function () {
				calls.push(arguments);
			}
		},
		dictionaryChecker = new DictionaryChecker(http);
	
	dictionaryChecker.check("blah");
	
	test.equal(1, calls.length);
	
	test.done();
};