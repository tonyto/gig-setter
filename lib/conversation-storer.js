var fs = require("fs");

function ConversationStore() {
    this._conversationStore = {};      
}

this.conversationStore = new ConversationStore();

ConversationStore.prototype.store = function (conversation, callback) {     
    this._conversationStore = conversation;     
};

ConversationStore.prototype.checkForDuplicates = function (conversation, callback) {     
    
};