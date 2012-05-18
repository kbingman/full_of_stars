var Sector = require('../models/sector').Sector,
    System = require('../models/sector').Sector,
    async = require('async');

// Define actions which can be called from the client using ss.rpc('systems.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    getSectors: function() {
      Sector.all(function(error, sectors){
        if(error){ return res(false); }
        
        ss.publish.all('sectors', sectors);
        return res(true);
      });
    }, 
    
    createSector: function(params){
      Sector.create(params, function(error, sector){
        if(error){ return res(false); }
        
        sector.createSystems(function(error, systems){
          if(error){ return res(false); }
          
          ss.publish.all('sector', sector);
          return res(true);
        });
      });    
    },
    
    showSector: function(id){
      Sector.get(id, function(error, sector){
        if(error){ return res(false); }
        console.log(id)
        System.find({ 'sectorId': id }, function(error, systems){
          if(error){ return res(false); }
          
          ss.publish.all('showSector', { sector: sector, systems: systems });
          return res(true);
        });
      });    
    }    

  };

};
