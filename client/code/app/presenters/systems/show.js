var utilities = require('/utilities');

exports.present = function (system) { 
        
  var html = ss.tmpl['app-systems-show'].render(exports.context(system));
  
  $('#content').html(html);
  $('#overlay').show();

  var sideView = $('#side-view'),
      systemMap = $('#system-map'),
      ctx = systemMap[0].getContext('2d'),
      sideviewCtx = sideView[0].getContext('2d');
  
  
  if(ctx && sideviewCtx){
    drawSystemSideView(sideviewCtx, system);
    Sector.systemAnimator = setInterval(function(){
      drawSystemTopView(ctx, system);
    }, 42);
  }
  
  sideView.bind('click', function(e){
    var x = (e.offsetX - Sector.xFactor) / Sector.scale,
        y = (e.offsetY - Sector.yFactor) / Sector.scale,
        fuzziness = 1 * Sector.scale; 
    
    // var planet = system.planets.find(function(s){
    //   return (s.x < x + fuzziness && s.x > x - fuzziness) && (s.y < y + fuzziness && s.y > y - fuzziness)
    // });
    // if(system){
    //   
    //   return;
    // }
    
  });
};

exports.context = function(system){
  return {
    system: system,
    width: function(){
      width = 0;
      system.planets.forEach(function(p){
        width = width + 24 + Math.ceil(p.radius * 20)
      });
      return width;
    },
    ships: Sector.player.ships,
    planets: system.planets.map(function(p){
      p['dRadius'] = Math.round(p['radius'] * 20);
      p['margin'] = -Math.round(p['dRadius'] / 2);
      p['position'] = p.position + 1; 
      return p;
    })
  }
}

var drawSystemTopView = function(ctx, system){
  var height = 210,
      width = 920,
      xCenter = width / 2,
      yCenter = height / 2,
      star = system.stars[0],
      starRadius = star.radius * 36,
      x = starRadius;
      
  // Background
  ctx.clearRect(0,0, width, height); 
  ctx.fillStyle = "#d9d9d9"; 
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.translate(xCenter,yCenter);
        
  // Star
  ctx.beginPath();  
  ctx.fillStyle = star.klass; 
  ctx.arc(0, 0, starRadius, 0, Math.PI*2, true); 
  ctx.fill();  

  system.planets.forEach(function(p){
    var radius = Math.round(Math.sqrt(p.radius * 24)),
        time = new Date();
    // ctx.save();

    x = Math.round(radius + x + 10);
    
    // Orbital Path
    ctx.beginPath();  
    ctx.strokeStyle = '#888';
    ctx.arc(0, 0, x, 0, Math.PI * 2, true); 
    ctx.stroke();
    
    // Planet
    var deg = ((4 * Math.PI) / 60) * time.getSeconds() + ((4 * Math.PI) / 60000) * time.getMilliseconds()
    ctx.rotate( deg );
    ctx.fillStyle = "#444"; 
    ctx.beginPath(); 
    ctx.arc(0 + x, 0, radius, 0, Math.PI*2, true); 
    ctx.fill();
    
    // ctx.restore();
    x = Math.round(radius + x + 10);
  });
  ctx.restore();
}

var drawSystemSideView = function(ctx, system){
  var x = 0,
      width = 920,
      height = 140,
      centerline = height / 2,
      star = system.stars[0],
      elargmentFactor = 240;
  
  ctx.fillStyle = "#d9d9d9"; 
  ctx.fillRect(0, 0, width, height);
  
  // Elliptical Plane
  ctx.beginPath(); 
  ctx.strokeStyle = '#888';
  ctx.moveTo(0, centerline);
  ctx.lineTo(width, centerline);
  ctx.stroke();
  
  // Star
  x = (star.radius * elargmentFactor) - (star.radius * elargmentFactor * 0.8);
  ctx.beginPath();  
  ctx.fillStyle = star.klass; 
  ctx.arc(-(star.radius * elargmentFactor * 0.8), centerline, star.radius * elargmentFactor, 0, Math.PI * 2, true); 
  ctx.fill();
    
  // Planets
  system.planets.forEach(function(p){
    var radius = Math.round(Math.sqrt(p.radius * 48));
    
    x = Math.round(radius + x + 10);
    ctx.fillStyle = "#444"; 
    ctx.beginPath(); 
    
    ctx.arc(x, centerline, radius, 0, Math.PI*2, true); 
    ctx.fill();
    x = Math.round(radius + x + 10);
  });

}
