var fs = require("fs"),
_ = require("underscore");

function ConversationStore() {
    this._conversationStore = {   };
        
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

ConversationStore.prototype.checkForDuplicates = function (convKey, convPlayer) {     
    var words = this._conversationStore[convKey][convPlayer];
    result = words.length !== _.uniq(words).length;

    return result;
};
