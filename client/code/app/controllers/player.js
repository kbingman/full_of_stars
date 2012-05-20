ss.rpc('app.getCurrentPlayer', function(success){
  console.log(success);
});


// Socket Emitters
// ------------------------------------------------ //

ss.event.on('login', function(player) {
  Sector.player = player;
  
  // Gets the systems
  ss.rpc('ships.all', function(success){
    console.log(success)
  });
  
  // Gets the homeworld 
  ss.rpc('systems.show', player.homeworldId, function(){
    console.log('homeworld')
  });

  return 
});

// Homeworld system event. May need to define this more exactly serverside...
ss.event.on('system', function(system){
  if (Sector.player.homeworldId == system._id) {
    Sector.homeworld = system;
    exports.showPlayer(system);
  }
});

ss.event.on('ships', function(ships){
  Sector.player.ships = ships;
  setTimeout(function(){
    ships.forEach(function(s){
      var canvas = $('canvas#canvas');
      if (canvas[0].getContext) {  
        var ctx = canvas[0].getContext("2d");  
        ctx.beginPath();
        ctx.arc(s.x * Sector.scale, s.y * Sector.scale, 12, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.strokeStyle = "#fff";
        ctx.stroke();
      }
    });
    
  }, 500)
});

exports.showPlayer = function(system){
  // Sets up the canvas size and centers the players homeworld
  Sector.width = $(window).width();
  Sector.height = $(window).height() - 40;
  Sector.xFactor = ((Sector.width / 2) - (system.x * Sector.scale));
  Sector.yFactor = ((Sector.height / 2) - (system.y * Sector.scale)) - 20;
    
  var x1 = system.x - ((Sector.width / 2) / Sector.scale),
      x2 = system.x + ((Sector.width / 2) / Sector.scale),
      y1 = system.y - ((Sector.height / 2) / Sector.scale),
      y2 = system.y + ((Sector.height / 2) / Sector.scale);

  // gets only the systems displayed on the page
  ss.rpc('systems.all', { x1: x1, x2: x2, y1: y1, y2: y2 });
}
