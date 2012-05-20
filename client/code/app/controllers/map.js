var map = require('/presenters/map');

ss.event.on('systems', function(systems) {
  Sector.systems = systems;
  
  Sector.homeworld = Sector.systems.find(function(s){
    return s._id == Sector.player.homeworldId;
  });

  map.present(Sector.systems);
  
  return;
});

exports.show = function(){
  console.log('show map')
  $('#overlay').hide();
  // map.present(Sector.systems);
}