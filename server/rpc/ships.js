var Ship = require('../models/ship').Ship,
    app = require('./app');

exports.actions = function(req, res, ss) {

  req.use('session');
  //req.use('example.authenticated')

  return {

    all: function() {
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors
        
        Ship.all(function(error, ships){
          app.handleErrors

          ss.publish.all('ships', ships);
          return res(true);
        });
        
      });
    }, 
    
    create: function(params){
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors
        
        params['playerId'] = player._id.toString();
        ss.log('➙'.cyan, 'params'.cyan, params);
        Ship.create(params, function(error, ship){
          app.handleErrors;
          
          ss.log('➙'.cyan, 'ship'.cyan, ship);
        
          ss.publish.all('ship', ship);
          return res(true);
        });  
        
      });
    },
    
    show: function(id){
      Ship.get(id, function(error, ship){
        if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
        ss.publish.all('ship', ship);
        return res(true);
      });    
    },
    
    update: function(id, params){
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors;
        
        Ship.get(id, function(error, ship){
          app.handleErrors; 
          console.log(ship)
    
          if(ship && ship.playerId === player._id.toString()){
            ship.update(params, function(error, ship){
              app.handleErrors; 
            
              ss.publish.all('updateShip', ship);
              return res(true);
            }); 
          } else {
            return res(false);
          }

        });
        
      });   
    },
    
    destroy: function(params){
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors
      
        Ship.destroy(function(error){
          if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
          return res(true);
        }); 
      });   
    },
         

  };
  
};

var handleErrors = function(error){
  if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
}
