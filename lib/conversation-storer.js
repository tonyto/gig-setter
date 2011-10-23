var fs = require("fs");

function ConversationStore() {
    this._conversationStore = {};
      
}

this.conversationStore = new ConversationStore();

ConversationStore.prototype.store = function (conversationKey, conversation, callback) {
    fs.readFile('./store/'+conversationKey+'.json', function(err, content) {
        try{            
            this._conversationStore = JSON.parse(content);
            console.log('I retreieved: ');
            console.log(_conversationStore);
        } catch(ex) {
            console.log('Could not retrieve: '+conversationKey);
            console.log(ex);   
        }
    });
    
    this._conversationStore[conversationKey] = conversation;
    fs.writeFile('./store/'+conversationKey+'.json', JSON.stringify(this._conversationStore), encoding='utf-8', function(err){
        if(err){
            throw err;
        }
        console.log('It was saved');
        
        if(callback){callback();}
    });    
};
