ss.rpc('app.getCurrentPlayer', function(success){
  console.log(success);
});


// Socket Emitters
// ------------------------------------------------ //

ss.event.on('login', function(player) {
  Sector.player = player;
  
  // ss.rpc('ships.all', function(success){
  //   console.log(success)
  // });
  
  ss.rpc('systems.show', player.homeworldId, function(){
    console.log('homeworld')
  });

  return 
});

ss.event.on('system', function(system){
  if (Sector.player.homeworldId == system._id) {
    Sector.homeworld = system; 
    
    Sector.width = $(window).width();
    Sector.height = $(window).height() - 40;
    
    var x1 = system.x - ((Sector.width / 2) / Sector.scale),
        x2 = system.x + ((Sector.width / 2) / Sector.scale),
        y1 = system.y - ((Sector.height / 2) / Sector.scale),
        y2 = system.y + ((Sector.height / 2) / Sector.scale);
        
    Sector.xFactor = ((Sector.width / 2) - (system.x * Sector.scale));
    Sector.yFactor = ((Sector.height / 2) - (system.y * Sector.scale));
        
    console.log(system.x * Sector.scale)
    console.log(Sector.xFactor)
    console.log(Sector.yFactor)

    // console.log(y1)
    // console.log(y2)
    ss.rpc('systems.all');
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
