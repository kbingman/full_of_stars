var Sector = require('../models/sector').Sector,
    System = require('../models/system').System,
    app = require('./app');;

// Define actions which can be called from the client using ss.rpc('systems.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    all: function() {
      Sector.all(function(error, sectors){
        app.handleErrors(req, res, ss, error); 
        
        ss.publish.all('sectors', sectors);
        return res(true);
      });
    }, 
    
    create: function(params){
      Sector.create(params, function(error, sector){
        app.handleErrors(req, res, ss, error); 
        
        sector.createSystems(function(error, systems){
          app.handleErrors(req, res, ss, error); 
          
          ss.publish.all('sector', sector);
          return res(true);
        });
      });    
    },
    
    show: function(id){
      Sector.get(id, function(error, sector){
        app.handleErrors(req, res, ss, error); 
  
        System.find({ 'sectorId': id }, function(error, systems){
          app.handleErrors(req, res, ss, error); 
          
          ss.publish.all('showSector', { sector: sector, systems: systems });
          return res(true);
        });
      });    
    }    

  };

};
