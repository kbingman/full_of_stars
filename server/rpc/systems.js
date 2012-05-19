var System = require('../models/system').System,
    app = require('./app');;

exports.actions = function(req, res, ss) {

  req.use('session');

  //req.use('example.authenticated')

  return {
    
    all: function() {
      System.all(function(error, systems){
        app.handleErrors(req, res, ss, error); 
        
        ss.publish.all('systems', systems);
        return res(true)
      });
    },
    
    show: function(id) {
      System.get(id, function(error, system){
        app.handleErrors(req, res, ss, error); 
        
        ss.publish.all('system', system);
        return res(true)
      });
    }
    
    
  };

};

