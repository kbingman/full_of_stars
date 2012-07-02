require('resourceful');

var Planet = resourceful.define('planet', function () {
  this.use('memory');
  
  this.property('x', Number);
  this.property('y', Number);
  
  this.colors = {
    'hot gas giant': 'red',
    'ice giant': 'cyan',
    'gas giant': 'orange',
    'terran': 'blue',
    'arid': 'tan'
  }
  
});

exports.Planet = Planet;
