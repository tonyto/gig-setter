var conversationStore = require("../lib/conversation-storer").conversationStore;

exports["should return false when there are no duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Tony',
        result = conversationStore.checkForDuplicates(key,player);

        test.equal(result,false);
        test.done();
};

exports["should return true when there are duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Greg',
        result = conversationStore.checkForDuplicates(key,player);
            test.equal(result, true);
            test.done();
};
