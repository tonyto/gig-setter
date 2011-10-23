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

exports["should add new conversation if it don exists"] = function (test) {
    var key = 'Non_existant',
        player = 'Greg',
        result = conversationStore.addWord(key, player, 'WORD');
        test.equal(result[player][0], 'WORD');
        test.done();        
};

exports["should retrieve conversation if exists"] = function (test) {
    var key = 'New_conversation',
        player = 'Greg',        
        result = conversationStore.addWord(key, player, 'WORD');
        conversationStore.getConversation(key, function(err, res){
            
                test.equal(res[key][player][0], 'WORD');
                test.done();            
            }       
        );        
};



