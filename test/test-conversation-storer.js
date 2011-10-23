var conversationStore = require("../lib/conversation-storer").conversationStore;

exports["should return false when there are no duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Tony';
        conversationStore.addWord(key,player,'hello');
        conversationStore.addWord(key,player,'is');
    

        result = conversationStore.checkForDuplicates(key,player);

        test.equal(result,false);
        test.done();
};

exports["should return true when there are duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Greg';

        conversationStore.addWord(key,player,'hello');
        conversationStore.addWord(key,player,'hello');

        result = conversationStore.checkForDuplicates(key,player);
            test.equal(result, true);
            test.done();
};
