var systems = require('/controllers/systems'),
    showSectorPresenter = require('/presenters/sectors/show'),
    sectorIndexPresenter = require('/presenters/sectors/index');

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

  return showSectorPresenter.present(data.sector, data.systems)
});

// exports.show = function(sector, systems){  
//   showSectorPresenter.present(sector, systems)
// }

exports.index = function(sectors){
  sectorIndexPresenter.present(sectors)
}


