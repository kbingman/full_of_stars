exports.present = function(ship){
  var html = ss.tmpl['admin-ships-ship'].render(exports.context(ship));

  $('#ship-usc').html(html);
  // draw(ship.price)
}

exports.context = function(ship){
  return {
    ship: ship, 
    weaponsSentence: ship.weapons.toSentence(),
    price: ship.price ? ship.price.format() : 0
  }
}

// Private
// ------------------------------------------------------------

var draw = function(price) {  
  var height = price / 1000 * 42;
  var canvas = document.getElementById("ship-price");  
  if (canvas.getContext) {  
    var ctx = canvas.getContext("2d");  

    ctx.fillStyle = "#fff";  
    ctx.fillRect (0, 0, 57, 42);  

    ctx.fillStyle = "orange";  
    
    ctx.fillRect (0, 42 - height, 57, 42);
    // (x, y, w, h)  
  }  
}  
