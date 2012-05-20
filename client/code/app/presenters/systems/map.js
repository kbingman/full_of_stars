var showSystem = require('/presenters/systems/show');

exports.present = function(systems){
  
  Sector.canvas = $('canvas#canvas');
  Sector.canvas.attr({
    width: Sector.width,
    height: Sector.height
  });
  
  
  Sector.canvas.on('click', function(e){
    var x = (e.offsetX - Sector.xFactor) / Sector.scale,
        y = (e.offsetY - Sector.yFactor) / Sector.scale,
        fuzziness = 1 * Sector.scale; 
    
    var system = Sector.systems.find(function(s){
      return (s.x < x + fuzziness && s.x > x - fuzziness) && (s.y < y + fuzziness && s.y > y - fuzziness)
    });
    showSystem.present(system);
  });
  
  Sector.canvas.on('tap', function(){
    alert(e.offsetX / Sector.scale + ':' + e.offsetY / Sector.scale)
  });
  
  // canvas.on('mousemove', function(e){
  //   var x = e.offsetX / Sector.scale;
  //   var y = e.offsetY / Sector.scale;
  //   
  //   clearTimeout(Sector.hover);
  //   Sector.hover = setTimeout(function(){
  //     Sector.systems.forEach(function(s){
  //       if((s.x < x + 4 && s.x > x - 4) && (s.y < y + 4 && s.y > y - 4)){
  //         canvas.css({ 'cursor': 'pointer' });
  //         return
  //       } else {
  //         canvas.css({ 'cursor': 'default' });
  //       }
  //     });
  //   }, 200);
  // });
  
  if (Sector.canvas[0].getContext) {  
    var ctx = Sector.canvas[0].getContext("2d");  
    // drawSystem(ctx, Sector.homeworld);
    
    systems.forEach(function(system){
      drawSystem(ctx, system);
      // console.log(system.stars[0].klass)
    })
    
    markSystem(ctx, Sector.homeworld);
  }
  
}

// Private
// ------------------------------------------------ //

var markSystem = function(ctx, system){     
  var x = Math.round(system.x * Sector.scale) + Sector.xFactor,
      y = Math.round(system.y * Sector.scale) + Sector.yFactor;  
  
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.strokeStyle = "hsla(30, 100%, 50%, 0.72)";
  ctx.stroke();
  ctx.fillStyle = "hsla(30, 100%, 50%, 0.12)"; 
  ctx.fill();
}

var drawSystem = function(ctx, system){

  var radius = Math.round(system.stars[0].radius * 1.5 * Sector.scale),
      x = Math.round(system.x * Sector.scale) + Sector.xFactor,
      y = Math.round(system.y * Sector.scale) + Sector.yFactor;      
  
  // var radgrad = ctx.createRadialGradient(60,60,0,60,60,60);
  // radgrad.addColorStop(0, 'rgba(255,255,255,1)');
  // radgrad.addColorStop(0.8, 'rgba(255,255,255,.9)');
  // radgrad.addColorStop(1, 'rgba(255,255,255,0)');
  // 
  // ctx.fillStyle = 'hsla(0, 0%, 100%, 0.99)';
  // ctx.fillRect((system.x * 2) - (radius * 12), (system.y * 2) -(radius * 12), radius * 24, radius * 24);
  
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fillStyle = system.stars[0].klass; 
  ctx.fill();  
}


// var drawPath = function(canvas, system1, system2){
//   ctx.lineWidth = "2";
//   ctx.moveTo(system1.x + 24, system1.y + 24);  
//   ctx.lineTo(system2.x + 24, system2.y + 24);
//   ctx.strokeStyle = "hsla(30, 100%, 50%, 0.72)";
//   ctx.stroke();
// }


