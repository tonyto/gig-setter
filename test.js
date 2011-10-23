var store = require('./lib/conversation-storer.js'),
    eyes = require('eyes');
    
eyes.inspect(store);
store.conversationStore.addWord('Greg_Tony', 'Greg', 'bollox');

eyes.inspect(store);
//