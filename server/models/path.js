var resourceful = require('resourceful');
    
// embedded in Ship
var Path = resourceful.define('path', function () {

  var self = this;
  
  self.property('origin', String);
  self.property('destination', String);

   
});

exports.Path = Path;
