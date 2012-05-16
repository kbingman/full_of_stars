var utilities = require('/utilities');
var Ship = require('ship').Ship;
var shipsIndexPresenter = require('/presenters/ships_index');
var editShipPresenter = require('/presenters/edit_ship');
var updateShipPresenter = require('/presenters/update_ship');
var newPresenter = require('/presenters/new_ship');


// Socket Emitters
// ------------------------------------------------ //
ss.event.on('ships', function(ships) {
  Admin.ships = ships.map(function(params){
    return new Ship(params)
  });
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
  })
  
  
  var form = $('form#edit-ship-form');
  form.on('keyup', function(e){
    e.preventDefault();
    clearTimeout(Admin.timer);
    Admin.timer = setTimeout(function(){ 
      submitUpdate(Admin.ship._id, form, true); 
    }, 100);
  });
   
  form.on('submit', function(e){
    e.preventDefault();
    submitUpdate(Admin.ship._id, form);
  });
  
  form.find('select.live').on('change', function(e){
    e.preventDefault();
    submitUpdate(Admin.ship._id, form);
  });
  
  form.find('.radio').on('click', function(e){
    if(e.target.tagName === 'BUTTON'){
      $(this).find('input').val($(e.target).text());
      e.preventDefault();
      submitUpdate(Admin.ship._id, form);
    }
  });
}

var submitUpdate = function(id, form, flag){
  form.serializeArray().forEach(function(attr){
    Admin.ship[attr.name] = attr.value;
  });
  Admin.ship.update(function(err, ship){
    //updateShipPresenter.present(ship);
  });
};
