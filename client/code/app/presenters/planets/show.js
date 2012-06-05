var utilities = require('/utilities');

exports.present = function (planet) { 
        
  var html = ss.tmpl['app-planets-show'].render({
    planet: planet
  });
  
  $('#content').html(html);
  $('#overlay').show();
  
  var systemMap = $('#planet-map'),
      ctx = systemMap[0].getContext('2d');
  
  drawPlanetView(ctx, planet);
  
  $('a.js-router').on('click', function(e){
    e.preventDefault();
    window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
  });
  
};

var drawPlanetView = function(ctx, planet){
  var height = 420,
      width = 920,
      xCenter = width / 2,
      yCenter = height / 2,
      radius = planet.radius * 24,
      x = radius;
      
  // Background
  ctx.clearRect(0,0, width, height); 
  ctx.fillStyle = "#d9d9d9"; 
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  
  ctx.beginPath(); 
  ctx.strokeStyle = '#888';
  ctx.moveTo(0, yCenter);
  ctx.lineTo(width, yCenter);
  ctx.stroke();
  
  // Planet
  ctx.translate(xCenter,yCenter);
  ctx.beginPath();  
  ctx.fillStyle = '#222'; 
  ctx.arc(0, 0, radius, 0, Math.PI*2, true); 
  ctx.fill(); 
  

  
  
}
