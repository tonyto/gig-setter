var conversationStore = require("../lib/conversation-storer").conversationStore;
var eyes = require("eyes");

exports["should return false when there are no duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Tony';
        conversationStore.addWord(key,player,'hello');
        conversationStore.addWord(key,player,'is');
    
        result = conversationStore.checkForDuplicates(key,'word');

        test.equal(result,false);
        test.done();
};

exports["should return true when there are duplicates "] = function (test) {
    var key = 'Greg_Tony',
        player = 'Greg';

        conversationStore.addWord(key,player,'hello');

        result = conversationStore.checkForDuplicates(key,'hello');
        test.equal(result, true);
        test.done();
};

exports["should add new conversation if it don exists"] = function (test) {
    var key = 'Non_existant',
        player = 'Greg',
        result = conversationStore.addWord(key, player, 'WORD',1);
        test.equal(result[player][0].Word, 'WORD');
        test.done();        
};

exports["should retrieve conversation if exists"] = function (test) {
    var key = 'New_conversation',
        player = 'Greg',        
        result = conversationStore.addWord(key, player, 'WORD',1);
        
        conversationStore.getConversation(key, function(err, res){
            
                test.equal(res[player][0].Word, 'WORD');
                test.done();            
            }       
        );        
};

exports["should calculate score"] = function (test) {
    var key = 'Non_existant',
        player = 'Greg';
        conversationStore.addWord(key, player, 'WORD',1);
        conversationStore.addWord(key, player, 'WORD',1);
        conversationStore.addWord(key, 'Tony', 'WORD',1);
        
        result = conversationStore.getCurrentScores(key);
       
        eyes.inspect(result);

        test.equal(result[player], 3);
        test.equal(result['Tony'], 1);
        test.done();        
};


