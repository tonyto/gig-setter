var sys = require('sys');
var eyes = require('eyes');
var storer = require('./lib/conversation-storer.js');

var conversationKey= 'tony_matt_22102011141414';
var conversationKey2= 'greg_tonyd_22102011141414';
var conversationKey3= 'greg_tonyd_22102011141414987687';
var conversation = ['sausage','beans','egg','farts', 'tarts'];
var conversation2 = ['kylie','jason','json','ballache'];
var conversation3 = ['winter', 'spring', 'summer','donner','kebab','greasy'];

eyes.inspect(storer.conversationStore);

storer.conversationStore.store(conversationKey, conversation);
storer.conversationStore.store(conversationKey3, conversation2);
storer.conversationStore.store(conversationKey2, conversation3);
