var fs = require("fs");

var conversationStore = {};

this.store = function(conversationKey, conversation) {    
    fs.readFile('./store/store.json', function(err, content) {
        try{
            conversationStore = JSON.parse(content);
            console.log('I retreieved: ');
            console.log(conversationStore);
        } catch(ex) {}
    });    
    conversationStore[conversationKey] = conversation;
    fs.writeFile('./store/store.json', JSON.stringify(conversationStore), encoding='utf-8', function(err){
        if(err){
            throw err;
        }
        console.log('It was saved');
    });
};

this.retrieve = function(conversationKey){
    fs.readFile('./store/store.json', function(err, content) {
        conversationStore = JSON.parse(content);
        console.log('I retreieved: ');
        console.log(conversationStore);
    });    
};


