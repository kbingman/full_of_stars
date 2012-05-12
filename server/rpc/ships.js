var Ship = require('../models/ship').Ship;

exports.actions = function(req, res, ss) {

  req.use('session');
  //req.use('example.authenticated')

  return {

    all: function() {
      Ship.all(function(error, ships){
        if(error){ return res(false); }

        ss.publish.all('ships', ships);
        return res(true);
      });
    }, 
    
    create: function(params){
      Ship.create(params, function(error, ship){
        if(error){ return res(false); }
        
        ss.publish.all('ship', ship);
        return res(true);
      });    
    },
    
    show: function(id){
      Ship.get(id, function(error, ship){
        if(error){ return res(false); }
        
        ss.publish.all('ship', ship);
        return res(true);
      });    
    },
    
    update: function(id, params){
      console.log(params)
      Ship.update(id, params, function(error, ship){
        if(error){ return res(false); }
        
        ss.publish.all('ship', ship);
        return res(true);
      });    
    },
    
    destroy: function(params){
      Ship.destroy(function(error){
        if(error){ return res(false); }

        return res(true);
      });    
    },
         

  };
  
};
