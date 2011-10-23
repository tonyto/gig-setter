var store = require('./lib/conversation-storer.js'),
    eyes = require('eyes');
    
eyes.inspect(store);

store.conversationStore.addWord('Greg_Tony', 'Greg', 'bollox');

eyes.inspect(store);

store.conversationStore.addWord('Greg_Tony', 'Tony', 'sporking');

eyes.inspect(store);

store.conversationStore.addWord('Greg_Tony2', 'Greg', 'spanking');

var output = store.conversationStore.addWord('Greg_Tony2', 'Tony2', 'monkey');
eyes.inspect(store);

console.log(output);