var redis = require('redis');
var client;

this.store = function(conversationKey, conversation) {    
    var client = redis.createClient(2690, '50.30.35.9');
    //client.auth("5a3b82da5c2a1bc0514504b8f8f19773");

    client.on("error", function (err) {
        console.log(err.message);
    });    
    
    client.on("connect", function (err) {
        console.log('ready');
    });
    
    client.set(conversationKey, conversation, function(err, res){
        console.log('stored:' + res);   
    });        
};

this.retrieve = function(conversationKey){
    var client = redis.createClient(2690, 'gregsochanik@50.30.35.9');
    client.auth("5a3b82da5c2a1bc0514504b8f8f19773");
    
    client.on("error", function (err) {
        console.log(err.message);
    });
    
    client.get(conversationKey, function(err, res){
        console.log('retrieved:' + res);        
    });        
    
};
