var System = require('../models/system').System,
    app = require('./app');;

exports.actions = function(req, res, ss) {

  req.use('session');

  //req.use('example.authenticated')

  return {
    
    all: function(params) {
      var criteria = { $and: [
        {'x':{ $gte: params.x1 }}, 
        {'x':{ $lte: params.x2 }}, 
        {'y':{ $gte: params.y1 }}, 
        {'y':{ $lte: params.y2 }}
      ] };
   
      System.find(criteria, function(error, systems){
        app.handleErrors(req, res, ss, error); 
        
        ss.publish.user(req.session.userId,'systems', systems);
        return res(true)
      });
    },
    
    show: function(id) {
      System.get(id, function(error, system){
        app.handleErrors(req, res, ss, error); 
        
        ss.publish.user(req.session.userId, 'system', system);
        return res(true)
      });
    }
    
    
  };

};

