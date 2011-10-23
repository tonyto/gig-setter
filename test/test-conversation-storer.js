var conversation-storer = require("../lib/conversation-storer").ConversationStore;

exports["should return true when there are duplicates "] = function (test) {
var key = 'Greg_Tony';
var player = 'Tony';
	var conversationStore = new ConversationStore,
		actualValue,
		calls = [],
		callback = function (success) {
			test.equal(success, true);
			test.done();
		},
		result = conversationStore.checkForDuplicates(key,player, callback);
};


