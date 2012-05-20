ss.event.on('login', function(player) {
  Sector.player = player;
  
  ss.rpc('ships.all', function(success){
    console.log(success)
  });
  
  return 
});

ss.event.on('ships', function(ships){
  Sector.player.ships = ships;
  setTimeout(function(){
    ships.forEach(function(s){
      // Plot position 
      console.log(s);
      // var html = ss.tmpl['app-systems-ship'].render({ _id: s._id, x: s.x + 12, y: s.y + 12 });

      // $('#sector').append(html);
      var canvas = $('canvas#canvas');
      if (canvas[0].getContext) {  
        console.log('h')
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

ss.rpc('app.getCurrentPlayer', function(success){
  console.log(success)
});






