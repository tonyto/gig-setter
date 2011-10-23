var fs = require("fs");

function ConversationStore() {
    this._conversationStore = {};      
}

this.conversationStore = new ConversationStore();

ConversationStore.prototype.store = function (conversationKey, conversation, callback) {     
    this._conversationStore[conversationKey] = conversation;     
};