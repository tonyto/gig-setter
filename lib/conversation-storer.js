var fs = require("fs");

function ConversationStore() {
    this._conversationStore = {            
                    'Greg_Tony' :
                        {
                            'Greg' : ['word', 'yours' ],
                            'Tony' : ['up', 'truly']
                        }
                    };
        
}

this.conversationStore = new ConversationStore();

ConversationStore.prototype.store = function (conversation, callback) {     
    this._conversationStore = conversation;     
};

ConversationStore.prototype.add = function (convKey, convPlayer, word, callback) {

    //var playerArray = this._conversationStore.convKey.convPlayer;
    //playerArray[playerArray.length+1] = word;
    //this._conversationStore.convKey.convPlayer = playerArray;
};

ConversationStore.prototype.checkForDuplicates = function (convKey, convPlayer, callback) {     
    var words = this._conversationStore.convKey.convPlayer;
    return words;
};