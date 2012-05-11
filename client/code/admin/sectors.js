var systems = require('/systems');

// Main systems index view
ss.event.on('sectors', function(sectors) {
  Admin.sectors = sectors;

  return exports.showSectors(sectors);
  // window.router.dispatch('on', document.location.hash.replace('#',''));
});

// Create Sector
ss.event.on('sector', function(sector) {
  alert('hey')
  Admin.sectors.push(sector);
  return exports.showSectors(sectors);
});

// Show Sector

ss.event.on('showSector', function(data) {
  Admin.sector = data.sector;
  Admin.systems = data.systems;
  
  var html = ss.tmpl['admin-sectors-show'].render({
    sector: data.sector,
    systems: data.systems
  });
  
  console.log(data)

  return $('#content').html(html);
});


// Events
$('form#new-sector-form').on('submit', function(e){
  e.preventDefault();

  // TODO build a general function for this
  var jqueryParams = $(this).serializeArray();
  var params = {};
  jqueryParams.map(function(p){
    params[p.name] = p.value;
  });
  
  ss.rpc('sectors.createSector', params, function(success){
    console.log(success)
  });
});


exports.showSectors = function(){
  var sectors = Admin.sectors.map(function(sector){
    sector.size = sector.systemIds.length;
    return sector;
  });

  var html = ss.tmpl['admin-sectors-index'].render({
    sectors: sectors
  });

  $('#content').html(html);
  
  // Events
  // TODO build a general function for this
  $('#sectors a.sector').on('click', function(e){
    e.preventDefault();
    window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
  });
}

exports.showSector = function(id){
  
  ss.rpc('sectors.showSector', id, function(success){
    console.log(success)
  });
  
}


