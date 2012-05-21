var utilities = require('/utilities'),
    Ship = require('ship').Ship;
    shipsIndexPresenter = require('/presenters/ships/index'),
    editShipPresenter = require('/presenters/ships/edit'),
    updateShipPresenter = require('/presenters/ships/update'),
    newPresenter = require('/presenters/ships/new');


// Socket Emitters
// ------------------------------------------------ //
ss.event.on('ships', function(ships) {
  Sector.ships = ships.map(function(params){
    return new Ship(params)
  });
  if ($('#ships').is(':visible')) {
    shipsIndexPresenter.present(Sector.ships);
  }
  // 
  return 
});

ss.event.on('ship', function(params) {
  Sector.ships = Sector.ships.remove(function(s){
    return s._id == params._id;
  });
  Sector.ship = new Ship(params);
  Sector.ship.save(function(err, ship){
    Sector.ships.push(ship);
  });
  
  return exports.edit(Sector.ship);
});

ss.event.on('updateShip', function(params) {
  Ship.update(params._id, params, function(err, ship){
    updateShipPresenter.present(ship);
  });
});


// Views
// ------------------------------------------------ //
exports.new = function(){
  newPresenter.present();
}

exports.index = function(){
  shipsIndexPresenter.present(Sector.ships);
}


exports.edit = function(){
  editShipPresenter.present(Sector.ship);
  updateShipPresenter.present(Sector.ship);
}
