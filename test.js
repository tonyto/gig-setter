var sys = require('sys');
var storer = require('./lib/conversation-storer.js');

var conversationKey= 'test';
var conversation = 'test-conversation';

storer.store(conversationKey, conversation);

storer.retrieve(conversationKey);

