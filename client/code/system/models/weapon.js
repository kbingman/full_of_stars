require('resourceful');

var Weapon = resourceful.define('weapon', function () {
  
  this.property('name', String);
  this.property('price', String);

});

exports.Weapon = Weapon;
