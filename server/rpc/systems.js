var System = require('../models/system').System;

exports.actions = function(req, res, ss) {

  req.use('session');

  //req.use('example.authenticated')

  return {
    
    all: function() {
      System.all(function(error, systems){
        if(error){
          return res(false)
        }
        ss.publish.all('systems', systems);
        return res(true)
      });
    }
    
  };

};

