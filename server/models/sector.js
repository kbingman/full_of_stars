var resourceful = require('resourceful-mongo'),
    sugar = require('sugar'),
    async = require('async'),
    System = require('./system').System;

var Sector = resourceful.define('sector', function () {

  var self = this;
  
  this.use('mongodb', {
    uri: 'mongodb://localhost/planetary', 
    collection: 'sectors', 
    safe: true
  });
  
  this.property('name', String);
  this.property('x', Number);
  this.property('y', Number);
  this.property('y', Number);
  this.property('width', Number);
  this.property('height', Number);
  this.property('depth', Number);
  this.property('systemIds', Array);
  
  // Before Create 
  this.before('create', function(sector, callback) {
    // Defaults
    sector.width = 256;
    sector.height = 256;
    sector.depth = 256;
    
    sector.x = parseInt(sector.x);
    sector.y = parseInt(sector.y);
    sector.z = sector.z ? parseInt(sector.z) : 0;
    
    sector.systemIds = [];
    callback();
  });

});

Sector.prototype.createSystems = function(callback){
  var sector = this;   
  // Builds the specified number of systems
  var count = 0,
      quantity = Math.ceil(Math.random() * 42)
      systems = [];
      
  var createSytem = function (callback) {
    count++;
      
    var systemAttr = {
      sectorId: sector._id.toString(),
      x: parseInt(Math.random() * sector.width) + sector.x,
      y: parseInt(Math.random() * sector.height) + sector.y,
      z: parseInt(Math.random() * sector.depth) + sector.z
    }
      
    System.create(systemAttr, function(error, system){ 
      if(error){ 
        callback(error);
        return;
      };
      sector.systemIds.push(system.id);
      systems.push(system);
      callback(null, system); 
      // Async...
      // sector.save(function(){
      //   callback(null, system); 
      // });
    });
  };
  
  async.whilst(
    function () { return count < quantity; },
    createSytem,
    function (error) {
      if(error){
        console.log(error);
        callback(error);
      } else {
        callback(null, systems);
      }
    }
  );
}


exports.Sector = Sector;

