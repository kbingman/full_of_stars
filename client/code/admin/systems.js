var utilities = require('/utilities');
    
exports.show = function (systemId) { 
  var system = Admin.systems.find(function(s){
    return s._id == systemId;
  });
  if(system){
    var html = ss.tmpl['admin-systems-show'].render({
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
    });

    $('#modal').html(html);
    return utilities.openModal();
  }
};


