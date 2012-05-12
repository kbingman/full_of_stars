var utilities = require('/utilities');

exports.show = function (systemId, id) { 
  var system = Admin.systems.find(function(s){
    return s._id == systemId;
  });
  
  if(system){
    var planet = system.planets.find(function(p){
      return p._id == id;
    });

    var html = ss.tmpl['admin-planets-show'].render({
      system: system,
      dRadius: Math.round(planet.radius * 42),
      planet: planet
    });
    $('#modal').html(html);
    return utilities.openModal();
  }
};
