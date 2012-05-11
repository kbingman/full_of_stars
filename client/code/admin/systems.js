// Main systems index view
ss.event.on('systems', function(systems) {
  Admin.systems = systems;
  renderSystems(systems);
});

// Events
$('form#new-systems-form').on('submit', function(e){
  e.preventDefault();
  var number = $(this).find('#systems-number').val();
  ss.rpc('demo.createSystems', number, function(success){
    console.log(success)
  });
});


// Private functions
var renderSystems = function(systems){
  var systems = systems.map(function(system){
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
    alert($(e.currentTarget).attr('href'))
  });
 

  return 
}

