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

ConversationStore.prototype.addWord = function (convKey, convPlayer, word) {
    
    if(!this._conversationStore[convKey]){
        this._conversationStore[convKey] = {};
    }
    
    if(!this._conversationStore[convKey][convPlayer]){
        this._conversationStore[convKey][convPlayer] = [];
    }
    
    var playerArray = this._conversationStore[convKey][convPlayer];
    playerArray[playerArray.length] = word;
    this._conversationStore[convKey][convPlayer] = playerArray;    
    
    return this._conversationStore;    
};

ConversationStore.prototype.checkForDuplicates = function (convKey, convPlayer, callback) {     
    var words = this._conversationStore[convKey][convPlayer];
    return words;
};