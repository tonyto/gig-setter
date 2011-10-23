var fs = require("fs"),
    _ = require("underscore"),
    eyes = require("eyes");

function ConversationStore() {
    this._conversationStore = {};         
}

this.conversationStore = new ConversationStore();
ConversationStore.prototype.store = function (conversation, callback) {     
};

ConversationStore.prototype.getConversation = function (convKey, callback) {        
    
    var conversation =this._conversationStore[convKey];

    if(conversation) {
        if(callback) {
            callback('', conversation);
        }        
    } else {
        if(callback) {
            callback(convKey + ' does not exist');            
        }
    }    
};

ConversationStore.prototype.addWord = function (convKey, convPlayer, word, score) {

    if(!this._conversationStore[convKey]){
        this._conversationStore[convKey] = {};
    }

    if(!this._conversationStore[convKey][convPlayer]){
        this._conversationStore[convKey][convPlayer] = [];
    }

    var playerArray = this._conversationStore[convKey][convPlayer];
    playerArray[playerArray.length] = { Word : word, Score : score};
    this._conversationStore[convKey][convPlayer] = playerArray;    

    return this._conversationStore[convKey];    
};


ConversationStore.prototype.checkForDuplicates = function (convKey, word) {     
    var result = false,
        conversation = this._conversationStore[convKey];

    _.each(conversation, function(player){
            _.each(player,function(words){
                var containsWord = _.include(words,word);
                result = result ||containsWord; 
                });
            });

    return result;
};

ConversationStore.prototype.getCurrentScores = function (convKey) {
    var score = {},
        conversation = this._conversationStore[convKey];

    _.each(_.keys(conversation), function(key){        
            _.each(conversation[key], function(words){
                if(!score[key])
                    score[key] = 0;

                score[key] += words.Score;
            });
        });
    
    return score;
};
