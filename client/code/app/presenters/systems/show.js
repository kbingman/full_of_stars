var utilities = require('/utilities');

exports.present = function (system) { 
  var html = ss.tmpl['app-systems-show'].render(exports.context(system));

  $('#content').html(html);
  $('#overlay').show();
  var canvas = $('#system-map');
  var ctx = canvas[0].getContext('2d');
  
  // drawSystemSideView(ctx, system); 
  drawSystemTopView(ctx, system);
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
  var xCenter = 320,
      yCenter = 135,
      star = system.stars[0],
      starRadius = star.radius * 36;
  
  ctx.fillStyle = "#d9d9d9"; 
  ctx.fillRect(0, 0, 640, 270);
      
  // Star

  ctx.beginPath();  
  ctx.fillStyle = star.klass; 
  ctx.arc(xCenter, yCenter, starRadius, 0, Math.PI*2, true); 
  ctx.fill();  
  
  x = starRadius;
  
  system.planets.forEach(function(p){
    var radius = Math.sqrt(p.radius * 24);
    x = Math.round(radius + x + 10);
    
    // Orbital Path
    ctx.beginPath();  
    ctx.strokeStyle = '#888';
    ctx.arc(320, 135, x, 0, Math.PI*2, true); 
    ctx.stroke();
    
    // Planet
    ctx.fillStyle = "#444"; 
    ctx.beginPath(); 
    ctx.arc(xCenter + x, yCenter, radius, 0, Math.PI*2, true); 
    ctx.fill();
    
    x = Math.round(radius + x + 10);
  });
  
}

var drawSystemSideView = function(ctx, system){
  var x = 0,
      centerline = 135,
      star = system.stars[0];
  
  ctx.fillStyle = "silver"; 
  ctx.fillRect(0, 0, 640, 270);
  
  // Elliptical Plane
  ctx.beginPath(); 
  ctx.strokeStyle = '#888';
  ctx.moveTo(0, centerline);
  ctx.lineTo(640, centerline);
  ctx.stroke();
  
  // Star
  x = (star.radius * 240) - (star.radius * 240 * 0.8);
  ctx.beginPath();  
  ctx.fillStyle = "yellow"; 
  ctx.arc(-(star.radius * 240 * 0.8), centerline, star.radius * 240, 0, Math.PI*2, true); 
  ctx.fill();

  // Planets
  system.planets.forEach(function(p){
    var radius = Math.sqrt(p.radius * 48);
    x = Math.round(radius + x + 10);
    ctx.fillStyle = "#444"; 
    ctx.beginPath(); 
    ctx.arc(x, centerline, radius, 0, Math.PI*2, true); 
    ctx.fill();
    x = Math.round(radius + x + 10);
  });

}
