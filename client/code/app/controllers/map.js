var map = require('/presenters/systems/map');

ss.event.on('systems', function(systems) {
  Sector.systems = systems;

  map.present(Sector.systems);
  
  return;
});

exports.show = function(){
  $('#overlay').hide();
  // map.present(Sector.systems);
}