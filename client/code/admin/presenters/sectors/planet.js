var utilities = require('/utilities');

exports.present = function(system, planet){
  
  var html = ss.tmpl['admin-planets-show'].render({
    system: system,
    dRadius: Math.round(planet.radius * 42),
    planet: planet
  });
  
  $('#modal').html(html);
  
  return utilities.openModal();
  
}
