var resourceful = require('resourceful'),
    sugar = require('sugar');

var defaults = require('../../client/code/system/models/ship_defaults').defaults;
var Ship = resourceful.define('ship', function () {
  
  // this.use('mongo');
  
  this.use('mongodb', {
    uri: resourceful.db, 
    collection: 'ships', 
    safe: true
  });
  
  this.property('name', String);
  this.property('slug', String);
  this.property('player_id', String);
  this.property('number', Number)
  
  this.property('paths', Array);
  this.property('speed', Number);
  this.property('x', Number);
  this.property('y', Number);
  
  this.property('type', String)
  
  this.property('speed', Number);
  this.property('scienceLevel', Number);
  
  this.property('size', String);
  this.property('shape', String);
  this.property('armor', Array);
  this.property('weapons', Array);
  this.property('jump', Number);
  this.property('sublight', Number);
  this.property('fuel', String);
  
  // Before Create 
  this.before('create', function(ship, callback) {
    ship.weapons = [];
    ship.price = 0;
    ship.jump = parseInt(ship.jump);
    ship.sublight = parseInt(ship.sublight);
    callback();
  });
  
  // Before Save
  this.before('update', function(ship, callback){
    var price = 0;
    
    // this needs to move to the prototype
    var findProperty = function(property){
      var d = defaults[property];
      
      if(d){
        return d.find(function(p){
          return p.name === ship[property];
        });
      }
    }

    Object.extended(ship).each(function(p){ 
      var property = findProperty(p);
      
      if(property){
        // price logic needs to go here
        price = price + property.price
      }
    });
    ship.price = price;
    callback();
  });
  
});

exports.Ship = Ship;