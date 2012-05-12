var Sector = require('../models/sector').Sector,
    System = require('../models/system').System;

exports.actions = function(req, res, ss) {

  req.use('session');
  //req.use('example.authenticated')

  return {

    all: function() {
      Sector.all(function(error, sectors){
        if(error){ return res(false); }
        ss.publish.all('sectors', sectors);
        return res(true);
      });
    }, 
    
    create: function(params){
      Sector.create(params, function(error, sector){
        if(error){ return res(false); }
        
        sector.createSystems(function(error, sector){
          if(error){ return res(false); }

          ss.publish.all('sector', sector);
          return res(true);
        });
      });    
    },
    
    // TODO this should probably only return the sector, not the systems...
    show: function(id){
      Sector.get(id, function(error, sector){
        if(error){ return res(false); }
        
 
        System.find({ 'sectorId': id }, function(error, systems){
          if(error){ return res(false); }
          
          ss.publish.all('showSector', { sector: sector, systems: systems });
          return res(true);
        });
      });    
    }    

  };

};
