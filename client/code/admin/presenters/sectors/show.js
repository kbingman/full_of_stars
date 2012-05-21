var utilities = require('/utilities');

exports.present = function(sector, systems){
  
  var systems = systems.map(function(system){
    system.slug = system.stars[0].klass.toLowerCase();
    system.planets = system.planets.map(function(planet){
      planet.system_id = system._id;
      return planet;
    });
    return system;
  });

  var html = ss.tmpl['admin-sectors-show'].render({
    sector: sector,
    systems: systems.sortBy(function(s) {
      return -s.ctime; 
    })
  });
  
  $('#content').html(html);

  $('#systems a').on('click', function(e){
    e.preventDefault();
    window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
  });

}