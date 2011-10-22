var sys = require('sys');
var storer = require('./lib/conversation-storer.js');

var conversationKey= 'tony_matt_22102011141414';
var conversationKey2= 'greg_tonyd_22102011141414';
var conversation = ['sausage','beans','egg','farts', 'tarts'];
var conversation2 = ['kylie','jason','json','ballache'];

storer.store(conversationKey, conversation);
storer.store(conversationKey2, conversation2);
//storer.retrieve(conversationKey);

