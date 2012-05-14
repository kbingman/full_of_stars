var resourceful = require('resourceful-mongo');

var Ship = resourceful.define('ship', function () {
  
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
  
  // this.property('size', String);
  this.property('shape', String);
  this.property('armor', Array);
  this.property('weapons', Array);
  this.property('drive', String);
  this.property('fuel', String);
  
  // Before Create 
  this.before('create', function(ship, callback) {
    // Defaults
    ship.weapons = [];
    // ship.size = parseInt(ship.size);
    callback();
  });
  

});

exports.Ship = Ship;
