var Player = require('../models/player').Player,
    app = require('./app');

exports.actions = function(req, res, ss) {

  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    all: function() {
      Player.all(function(error, players){
        if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
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
    },
    
    update: function(id, params){
      app.getCurrentPlayer(req, res, function(error, currentPlayer){
        app.handleErrors(req, res, ss, error); 
        
        Player.update(id, params, function(error, player){
          app.handleErrors(req, res, ss, error);
          ss.log('➙'.cyan, 'params'.cyan, params); 
          
          ss.publish.all('updatePlayer', player);
          return res(true);
        });
        
      });   
    },
    
    destroy: function(id){
      app.getCurrentPlayer(req, res, function(error, currentPlayer){
        app.handleErrors(req, res, ss, error); 
      
        Player.destroy(id, function(error){
          if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
          return res(true);
        }); 
      });   
    }

  };

};
