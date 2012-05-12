var systems = require('/systems');
var utilities = require('/utilities');

// Main systems index view
ss.event.on('sectors', function(sectors) {
  Admin.sectors = sectors;
  return exports.index(Admin.sectors);
});

// Create Sector
ss.event.on('sector', function(sector) {
  Admin.sectors.push(sector);
  return exports.index(Admin.sectors);
});

// Show Sector
ss.event.on('showSector', function(data) {
  Admin.sector = data.sector;
  Admin.systems = data.systems;

  return exports.show(data.sector, data.systems)
});

exports.show = function(sector, systems){
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

exports.index = function(sectors){
  var sectors = sectors.map(function(sector){
    sector.size = sector.systemIds.length;
    return sector;
  });
  var partials = { 
    'admin-sectors-new': ss.tmpl['admin-sectors-new'] 
  };
  var html = ss.tmpl['admin-sectors-index'].render({
    sectors: sectors
  }, partials);

  $('#content').html(html);
  
  // Events
  $('form#new-sector-form').on('submit', function(e){
    e.preventDefault();

    var params = utilities.jsonifyParams($(this).serializeArray());
  
    ss.rpc('sectors.create', params, function(success){
      console.log(success)
    });
  });
}


