var Ship = require('../models/ship').Ship;

exports.actions = function(req, res, ss) {

  req.use('session');
  //req.use('example.authenticated')

  return {

    all: function() {
      Ship.all(function(error, ships){
        if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }

        ss.publish.all('ships', ships);
        return res(true);
      });
    }, 
    
    create: function(params){
      ss.log('➙'.cyan, 'params'.cyan, params);
      Ship.create(params, function(error, ship){
        if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
        ss.publish.all('ship', ship);
        return res(true);
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
      ss.log('➙'.cyan, 'params'.cyan, params);
      Ship.update(id, params, function(error, ship){
        if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
        
        ss.publish.all('ship', ship);
        return res(true);
      });    
    },
    
    destroy: function(params){
      Ship.destroy(function(error){
        if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }

        return res(true);
      });    
    },
         

  };
  
};

var handleErrors = function(error){
  if(error){ ss.log('➙'.red, 'error'.red, error); return res(false); }
}
