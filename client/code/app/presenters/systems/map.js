var showSystem = require('/presenters/systems/show');

exports.present = function(systems){
  
  Sector.canvas = $('canvas#canvas');
  Sector.canvas.attr({
    width: Sector.width,
    height: Sector.height
  });
  
  
  Sector.canvas.on('click tap', function(e){
    var x = (e.offsetX - Sector.xFactor) / Sector.scale,
        y = (e.offsetY - Sector.yFactor) / Sector.scale,
        fuzziness = 1 * Sector.scale; 
    
    var system = Sector.systems.find(function(s){
      return (s.x < x + fuzziness && s.x > x - fuzziness) && (s.y < y + fuzziness && s.y > y - fuzziness)
    });
    showSystem.present(system);
  });
  
  // Sector.canvas.on('tap', function(){
  //   alert(e.offsetX / Sector.scale + ':' + e.offsetY / Sector.scale)
  // });
  
  if (Sector.canvas[0].getContext) {  
    var ctx = Sector.canvas[0].getContext("2d");  
    // drawSystem(ctx, Sector.homeworld);
    
    drawGrid(ctx, Sector.width, Sector.height)
    
    systems.forEach(function(system){
      drawSystem(ctx, system);
      // console.log(system.stars[0].klass)
    });
    
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
  ctx.lineWidth = 1;
  ctx.strokeStyle = "hsla(30, 100%, 50%, 0.72)";
  ctx.stroke();
  ctx.fillStyle = "hsla(30, 100%, 50%, 0.12)"; 
  ctx.fill();
}

var drawGrid = function(ctx, width, height){
  var gridSize = 64 * Sector.scale,
      verticalLines = Math.floor(width / gridSize),
      horizontalLines = Math.floor(height / gridSize);
      
      console.log(Sector.xFactor % gridSize / 2)
  
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#222'; //"hsla(0, 0%, 100%, 0.12)";
  
  (verticalLines).times(function(i){
    i = i + 1;
    ctx.moveTo((i * gridSize) + 0.5, 0);  
    ctx.lineTo((i * gridSize) + 0.5, height);
    ctx.stroke();
  });
  (horizontalLines).times(function(i){
    i = i + 1;
    ctx.moveTo(0, (i * gridSize) + 0.5);  
    ctx.lineTo(width, (i * gridSize) + 0.5);
    ctx.stroke();
  });
}

var drawSystem = function(ctx, system){

  var radius = Math.round(system.stars[0].radius * 1.5 * Sector.scale),
      x = Math.round(system.x * Sector.scale) + Sector.xFactor,
      y = Math.round(system.y * Sector.scale) + Sector.yFactor;      
  
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


