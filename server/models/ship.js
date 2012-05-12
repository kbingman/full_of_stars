var resourceful = require('resourceful');

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
  
  this.property('armor', Array);
  this.property('weapons', String);
  this.property('drive', String);
  this.property('fuel', String);

});

exports.Ship = Ship;
