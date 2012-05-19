ss.event.on('login', function(player) {
  Sector.player = player;
  
  ss.rpc('ships.all', function(success){
    console.log(success)
  });
  
  return 
});

ss.event.on('ships', function(ships){
  Sector.player.ships = ships;
  ships.forEach(function(s){
    // Plot position 
    console.log(s.name);
  })
});

ss.rpc('app.getCurrentPlayer', function(success){
  console.log(success)
});






