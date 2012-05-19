var utilities = require('/utilities'),
    Ship = require('ship').Ship,
    shipsIndexPresenter = require('/presenters/ships/index'),
    editShipPresenter = require('/presenters/ships/edit'),
    updateShipPresenter = require('/presenters/ships/update'),
    newPresenter = require('/presenters/ships/new');


// Socket Emitters
// ------------------------------------------------ //
ss.event.on('ships', function(ships) {
  Admin.ships = ships.map(function(params){
    return new Ship(params)
  });
  console.log('ships')
  return shipsIndexPresenter.present(Admin.ships);
});

ss.event.on('ship', function(params) {

  Admin.ships = Admin.ships.remove(function(s){
    return s._id == params._id;
  });
  Admin.ship = new Ship(params);
  Admin.ship.save(function(err, ship){
    Admin.ships.push(ship);
  });
  
  return exports.edit(Admin.ship);
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

exports.edit = function(){
  
  // if (!Admin.player) {
  //   window.router.dispatch('on', '/login');
  //   window.router.setRoute('/login');
  //   return;
  // }

  editShipPresenter.present(Admin.ship);
  updateShipPresenter.present(Admin.ship);

}
