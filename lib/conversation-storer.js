var fs = require("fs"),
    eyes = require("eyes"),
    _ = require("underscore");

function ConversationStore() {
    this._conversationStore = {            
        'Greg_Tony' :
        {
            'Greg' : ['word', 'yours','word' ],
            'Tony' : ['up', 'truly']
        }
    };

}

this.conversationStore = new ConversationStore();

ConversationStore.prototype.store = function (conversation, callback) {     
    this._conversationStore = conversation;     
};

ConversationStore.prototype.add = function (convKey, convPlayer, word, callback) {
    
    if(!this._conversationStore[convKey]){
        this._conversationStore[convKey] = {};
    }
    
    //var playerArray = this._conversationStore.convKey.convPlayer;
    //playerArray[playerArray.length+1] = word;
    //this._conversationStore.convKey.convPlayer = playerArray;
};

ConversationStore.prototype.checkForDuplicates = function (convKey, convPlayer, callback) {     
    var words = this._conversationStore[convKey][convPlayer];
    
    callback(words.length !== _.uniq(words).length);
};
