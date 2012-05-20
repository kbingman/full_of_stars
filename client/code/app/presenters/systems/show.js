var utilities = require('/utilities');

exports.present = function (system) { 
  // var system = Sector.systems.find(function(s){
  //   return s._id == systemId;
  // });
  if(system){
    var html = ss.tmpl['app-systems-show'].render(exports.context(system));

    $('#modal').html(html);
    return utilities.openModal();
  }
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
    planets: system.planets.map(function(p){
      p['dRadius'] = Math.round(p['radius'] * 20);
      p['margin'] = -Math.round(p['dRadius'] / 2);
      p['position'] = p.position + 1; 
      return p;
    })
  }
}
