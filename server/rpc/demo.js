var System = require('../models/system').System,
    async = require('async');

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    getSystems: function() {
      sendSystems(req, res, ss);
    }, 
    
    createSystems: function(quantity){
      var count = 0,
          systems = [];
          
      async.whilst(
        function () { return count < quantity; },
        function (callback) {
          count++;
          System.create({}, function(error, system){ 
            if(error){ callback(error) };
            callback(null, system);
          });
        },
        function (error) {
          if(error){
            return res(false);
          } else {
            sendSystems(req, res, ss);
          }
        }
      );
    }

  };

};

// Private

var sendSystems = function(req, res, ss){
  System.all(function(error, systems){
    if(error){
      return res(false)
    }
    ss.publish.all('systems', systems);
    return res(true)
  });
}
