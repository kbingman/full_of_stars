var utilities = require('/utilities');
var Ship = require('ship').Ship;

ss.event.on('ships', function(ships) {
  Admin.ships = ships;
  return exports.index(ships);
});

ss.event.on('ship', function(ship) {
  Admin.ships = Admin.ships.remove(function(s){
    return s._id == ship._id;
  });
  Admin.ships.push(ship);
  Admin.ship = ship;

  return exports.edit(ship);
});

ss.event.on('updateShip', function(ship) {
  Admin.ships = Admin.ships.remove(function(s){
    return s._id == ship._id;
  });
  Admin.ships.push(ship);
  Admin.ship = ship;
  console.log('updated')
});


exports.index = function(){
  ships = Admin.ships;
  var html = ss.tmpl['admin-ships-index'].render({
    ships: ships
  });

  $('#content').html(html);
}

exports.new = function(){
  var html = ss.tmpl['admin-ships-new'].render(context(), partials);
  
  $('#content').html(html);
  
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

exports.edit = function(success){
  if (Admin.editing){
    Admin.editing = false; 
    return
  }
  
  // var ship = Admin.ships.find(function(s){
  //   return s._id == id;
  // });
  ship = Admin.ship;
  
  var html = ss.tmpl['admin-ships-edit'].render(context(ship), partials);
  
  
  $('#content').html(html);
  
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
  
  $('ul.weapons a.remove').on('click', function(){
    var value = $(this).prev('span').text();
    Admin.ship.weapons = Admin.ship.weapons .remove(function(w){
      return w == value;
    });
    ss.rpc('ships.update', Admin.ship._id, { weapons: Admin.ship.weapons }, function(success){
      console.log(success);
      window.router.dispatch('on', '/ships/' + Admin.ship._id);
    });
  })
  
  // Events
  var form = $('form#edit-ship-form');
  
  // form.on('keyup', function(e){
  //   e.preventDefault();
  //   clearTimeout(Admin.timer);
  //   Admin.timer = setTimeout(function(){ 
  //     submitUpdate(ship._id, form, true); 
  //   }, 300);
  // });
   
  form.on('submit', function(e){
    e.preventDefault();
    submitUpdate(ship._id, form);
  });
  
  // form.find('input').on('blur', function(e){
  //   e.preventDefault();
  //   Admin.editing = false;
  //   submitUpdate(ship._id, form);
  // });
  // 
  form.find('select.live').on('change', function(e){
    e.preventDefault();
    submitUpdate(ship._id, form);
  });
  
}

var submitUpdate = function(id, form, flag){
  var params = utilities.jsonifyParams(form.serializeArray());
  ss.rpc('ships.update', id, params, flag, function(success){
    console.log(success);
  });
};

var partials = {
  'admin-ships-form': ss.tmpl['admin-ships-form'],
  'admin-forms-select': ss.tmpl['admin-forms-select'],
  'admin-forms-input': ss.tmpl['admin-forms-input']
}

var context = function(ship){
  return {
    ship: ship,
    model: 'ship',
    name: { 
      name: 'name',
      label: 'Name',
      value: ship.name,
      helpText: 'The Class Name.'
    },
    fuel: {
      name: 'fuel',
      label: 'Fuel',
      value: ship.fuel,
      helpText: 'Percentage of Mass. We all need to gas up.'
    },
    type: {
      name: 'type',
      label: 'Type',
      list: utilities.mustachizeSelect('type', Ship.types, ship),
      helpText: 'The basic use of you ship, i.e. War, Exploration, Transport'
    },
    size: {
      name: 'size',
      label: 'Size',
      list: utilities.mustachizeSelect('size', Ship.sizes, ship),
      helpText: 'Size and Base price'
    },
    shape: {
      name: 'shape',
      label: 'Configuration',
      list: utilities.mustachizeSelect('shape', Ship.shapes, ship),
      helpText: 'Shape'
    },
    drive: {
      name: 'drive',
      label: 'Drive',
      list: utilities.mustachizeSelect('drive', Ship.drives, ship),
      helpText: 'Speed and Drive types. More types are available with better science.'
    },
    weaponsList: Ship.weapons,
    defensesList: []
  }
}
