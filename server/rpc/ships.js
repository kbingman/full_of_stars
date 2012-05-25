var Ship = require('../models/ship').Ship,
    app = require('./app');

exports.actions = function(req, res, ss) {

  req.use('session');
  //req.use('example.authenticated')

  return {

    all: function() {
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors(req, res, ss, error); 
        
        Ship.find({ 'playerId': player._id.toString() }, function(error, ships){
          app.handleErrors(req, res, ss, error); 

          ss.publish.user(req.session.userId, 'ships', ships);
          return res(true);
        });
        
      });
    }, 
    
    create: function(params){
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors(req, res, ss, error); 
        
        params['playerId'] = player._id.toString();
        ss.log('➙'.cyan, 'params'.cyan, params);
        Ship.create(params, function(error, ship){
          app.handleErrors;
          
          ss.log('➙'.cyan, 'ship'.cyan, ship);
        
          ss.publish.user(req.session.userId, 'ship', ship);
          return res(true);
        });  
        
      });
    },
    
    show: function(id){
      Ship.get(id, function(error, ship){
        if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
        ss.publish.user(req.session.userId, 'ship', ship);
        return res(true);
      });    
    },
    
    update: function(id, params){
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors(req, res, ss, error); 
        
        Ship.get(id, function(error, ship){
          app.handleErrors(req, res, ss, error);
          ss.log('➙'.cyan, 'params'.cyan, params); 
          
    
          if(ship && ship.playerId === player._id.toString()){
            ship.update(params, function(error, ship){
              app.handleErrors(req, res, ss, error); 
              ss.log('➙'.blue, 'ship'.cyan, ship);
              
              ss.publish.user(req.session.userId, 'updateShip', ship);
              return res(true);
            }); 
          } else {
            return res(false);
          }

        });
        
      });   
    },
    
    destroy: function(id){
      app.getCurrentPlayer(req, res, function(error, player){
        app.handleErrors(req, res, ss, error); 
      
        Ship.destroy(id, function(error){
          if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
          return res(true);
        }); 
      });   
    }
         

  };
  
};

