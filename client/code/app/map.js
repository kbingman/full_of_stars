var map = require('/presenters/map');

ss.event.on('systems', function(systems) {
  console.log(systems.length)
  Sector.systems = systems;
  
  Sector.homeworld = Sector.systems.find(function(s){
    return s._id = Sector.player.homeworldId;
  });
  
  map.present(Sector.systems);
  
  return;
});



