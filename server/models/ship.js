var resourceful = require('resourceful');

var Ship = resourceful.define('ship', function () {
  
  this.property('name', String);
  this.property('slug', String);
  this.property('player_id', String);
  this.property('paths', Array);
  this.property('speed', Number);
  this.property('x', Number);
  this.property('y', Number);
   
});

exports.Ship = Ship;
