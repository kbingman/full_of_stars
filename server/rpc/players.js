var Player = require('../models/player').Player;

exports.actions = function(req, res, ss) {

  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    all: function() {
      Player.all(function(error, players){
        if(error){ return res(false) }
        
        ss.publish.all('players', players);
        return res(true)
      });
    }, 
    
    create: function(params){

    },
    
    show: function(id){
      Player.get(id, function(error, player){
        if(error){ return res(false); }
        
        ss.publish.all('player', player);
        return res(true);
      });    
    } 

  };

};
