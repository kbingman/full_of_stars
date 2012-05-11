var System = require('../models/system').System,
    async = require('async');

// Define actions which can be called from the client using ss.rpc('systems.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {
    
    getSystems: function() {
      System.all(function(error, systems){
        if(error){
          return res(false)
        }
        ss.publish.all('systems', systems);
        return res(true)
      });
    },

    getAllSystems: function() {
      System.all(function(error, systems){
        if(error){
          return res(false)
        }
        ss.publish.all('allSystems', systems);
        return res(true)
      });
    }
    // createSystems: function(quantity){
    //   var count = 0,
    //       systems = [];
    //       
    //   async.whilst(
    //     function () { return count < quantity; },
    //     function (callback) {
    //       count++;
    //       System.create({}, function(error, system){ 
    //         if(error){ callback(error) };
    //         systems.push(system);
    //         callback(null, system);
    //       });
    //     },
    //     function (error) {
    //       if(error){
    //         return res(false);
    //       } else {
    //         ss.publish.all('systems', systems);
    //         return res(true)
    //       }
    //     }
    //   );
    // }

  };

};

