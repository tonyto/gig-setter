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

//ConversationStore.prototype.add

ConversationStore.prototype.checkForDuplicates = function (conversation, callback) {     
    var convKey = 'Greg_Tony';
    var convPerson = 'Greg';
    var words = this._conversationStore.convKey.convPerson;
};