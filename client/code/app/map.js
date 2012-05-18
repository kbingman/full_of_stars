ss.event.on('systems', function(systems) {
  console.log(systems.length)
  Sector.systems = systems;
  
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
  })
  
  // var canvas = document.getElementById("backdrop");  
  // if (canvas[0].getContext) {  
  //   var ctx = canvas[0].getContext("2d");  
  //   
  //   ctx.strokeStyle = "hsla(30, 100%, 50%, 0.72)"; 
  //   ctx.lineWidth = "2";
  //   ctx.moveTo(431, 242);  
  //   ctx.lineTo(1101, 114);
  //   ctx.stroke();
  //   
  //   ctx.beginPath();
  //   ctx.arc($(window).width() / 2, $(window).height() /2, 299, 0, Math.PI*2, true); 
  //   ctx.closePath();
  //   ctx.stroke();
  //   ctx.fillStyle = "hsla(30, 100%, 50%, 0.04)"; 
  //   ctx.fill();
  // 
  // }  
  
  return;
});



