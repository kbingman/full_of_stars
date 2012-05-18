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
  return shipsIndexPresenter.present(Admin.ships);
});

ss.event.on('ship', function(params) {
  console.log(params.playerId);
  
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
  // Events
  $('form#new-ship-form').on('submit', function(e){
    e.preventDefault();
  
    var params = utilities.jsonifyParams($(this).serializeArray());

    ss.rpc('ships.create', params, function(success){
      console.log(success);
      window.router.setRoute('/ships/' + Admin.ship._id);
    });
  });
}

exports.edit = function(){
  
  if (!Admin.player) {
    window.router.dispatch('on', '/login');
    window.router.setRoute('/login');
    return;
  }

  editShipPresenter.present(Admin.ship);
  updateShipPresenter.present(Admin.ship);
  // Events

  $('fieldset.list button').on('click', function(e){
    e.preventDefault();
    var fieldset = $(this).parents('fieldset');
    var value = fieldset.find('select').val();
    
    Admin.ship.weapons.push(value);
    
    ss.rpc('ships.update', Admin.ship._id, { weapons: Admin.ship.weapons }, function(success){
      console.log(success);
      window.router.dispatch('on', '/ships/' + Admin.ship._id);
    });
  });
  
  $('fieldset.list a.remove').on('click', function(){
    var value = $(this).prev('span').text();
    Admin.ship.weapons = Admin.ship.weapons .remove(function(w){
      return w == value;
    });
    ss.rpc('ships.update', Admin.ship._id, { weapons: Admin.ship.weapons }, function(success){
      console.log(success);
      window.router.dispatch('on', '/ships/' + Admin.ship._id);
    });
  });
  
  var form = $('form#edit-ship-form');
  form.find('div.radio button.btn').popover({ placement: 'bottom' });
  
  utilities.setFormActions(Admin.ship, form);
}
