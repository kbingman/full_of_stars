// Main systems index view
ss.event.on('systems', function(systems) {
  Admin.systems = systems;

  return exports.showSystems(systems);
  // window.router.dispatch('on', document.location.hash.replace('#',''));
});

// Events
$('form#new-systems-form').on('submit', function(e){
  e.preventDefault();
  var number = $(this).find('#systems-number').val();
  
  ss.rpc('systems.createSystems', number, function(success){
    
  });
});

// Demonstrates sharing code between modules by exporting function
exports.showSystem = function (systemId) { 
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
    return openModal();
  }
};

exports.showPlanet = function (systemId, id) { 
  var system = Admin.systems.find(function(s){
    return s._id == systemId;
  });
  
  if(system){
    var planet = system.planets.find(function(p){
      return p._id == id;
    });
    
    console.log(planet)

    var html = ss.tmpl['admin-planets-show'].render({
      system: system,
      dRadius: Math.round(planet.radius * 42),
      planet: planet
    });
    $('#modal').html(html);
    return openModal();
  }
};

exports.showSystems = function(){
  var systems = Admin.systems.map(function(system){
    system.slug = system.stars[0].klass.toLowerCase();
    system.planets = system.planets.map(function(planet){
      planet.system_id = system._id;
      return planet;
    });
    return system;
  });

  var html = ss.tmpl['admin-systems-index'].render({
    systems: systems.sortBy(function(s) {
      return -s.ctime; 
    })
  });
  
  // Events
  $('#content').html(html);
  $('#systems a').on('click', function(e){
    e.preventDefault();
    window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
    // alert($(e.currentTarget).attr('href'))
  });
}


// Private functions
var openModal = function(){
  var modal = $('#modal').find('.modal');
  modal.modal();

  // Centers window
  modal.css({
    'margin-left': -1 * (modal.width() / 2) + 'px'
  }); 
}

