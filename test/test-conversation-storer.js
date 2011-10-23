var conversationStore = require("../lib/conversation-storer").conversationStore;

exports["should return false when there are no duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Tony',
        actualValue,
        calls = [],
        callback = function (success) {
            test.equal(success, false);
            test.done();
        },
        result = conversationStore.checkForDuplicates(key,player, callback);
};

exports["should return true when there are duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Greg',
        actualValue,
        calls = [],
        callback = function (success) {
            test.equal(success, true);
            test.done();
        },
        result = conversationStore.checkForDuplicates(key,player, callback);
};
