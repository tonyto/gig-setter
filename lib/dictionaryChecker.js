var dictionaryUrl = dictionaryUrl = "http://www.google.com/dictionary/json?callback=a&q={q}&sl=en&tl=en&restrict=pr%2Cde&client=te";

this.DictionaryChecker = function DictionaryChecker(rest){
	this.check = function (searchTerm) {
	  searchUrl = dictionaryUrl.replace("{q}", searchTerm);
	  rest.get(searchUrl);
	};
};