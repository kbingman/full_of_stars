exports.present = function(systems){
  // this moves to a presenter...
  var html = ss.tmpl['systems-map'].render({
    systems : systems.map(function(system){
      system.x = system.x - 24;
      system.y = system.y - 24;
      system.slug = system.stars[0].klass.toLowerCase();
      return system;
    })
  });
  $('#content').html(html);
  
  var canvas = $('canvas#canvas');
  canvas.attr({
    width: $(window).width(),
    height: $(window).height()
  });
  
  markSystem(canvas, Sector.homeworld)
}

// Private
// ------------------------------------------------ //

var markSystem = function(canvas, system){
  if (canvas[0].getContext) {  
    var ctx = canvas[0].getContext("2d");      
    ctx.beginPath();
    ctx.arc(system.x + 24, system.y + 24, 20, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.strokeStyle = "hsla(30, 100%, 50%, 0.72)";
    ctx.stroke();
    ctx.fillStyle = "hsla(30, 100%, 50%, 0.12)"; 
    ctx.fill();
  } 
}

var drawPath = function(canvas, system1, system2){
  ctx.lineWidth = "2";
  ctx.moveTo(system1.x + 24, system1.y + 24);  
  ctx.lineTo(system2.x + 24, system2.y + 24);
  ctx.strokeStyle = "hsla(30, 100%, 50%, 0.72)";
  ctx.stroke();
}


