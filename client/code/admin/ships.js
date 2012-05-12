var utilities = require('/utilities');


// TEMP!!!
var typesList = [
  'Scout',
  'Colony',
  'Cargo',
  'Mining',
  'Science',
  'Close Escort',
  'Cruiser',
  'Destroyer',
  'Battle Station'
];
  
var drivesList = [
  'Sublight In-System',
  'Sublight (40% C)',
  'High Accelleration Sublight (80% C)',
  'High Accelleration Sublight (99% C)',
  'Jump'
];
  
var weaponsList = [
  'Ship to Ship Missles',
  'Planetary Bombardment Missles',
  'Rail Guns',
  'Lasers (really?)',
  'Plasma Cannons',
  'Gamma Cannons'
]


ss.event.on('ships', function(ships) {
  Admin.ships = ships;
});

ss.event.on('ship', function(ship) {
  Admin.ships = Admin.ships.remove(function(s){
    return s._id == ship._id;
  })
  Admin.ships.push(ship);
  Admin.ship = ship;
});

exports.index = function(){
  ships = Admin.ships
  var html = ss.tmpl['admin-ships-index'].render({
    ships: ships
  });

  $('#content').html(html);
}

exports.new = function(){
  var partials = {
    'admin-ships-form': ss.tmpl['admin-ships-form']
  }
  var html = ss.tmpl['admin-ships-new'].render({
    typesList: utilities.mustachizeSelect('type', typesList),
    drivesList: utilities.mustachizeSelect('drive', drivesList),
    weaponsList: utilities.mustachizeSelect('weapons', weaponsList)
  }, partials);
  
  $('#content').html(html);
  
  // Events
  $('form#new-ship-form').on('submit', function(e){
    e.preventDefault();
  
    var params = utilities.jsonifyParams($(this).serializeArray());

    ss.rpc('ships.create', params, function(success){
      console.log(success);
      window.router.dispatch('on', '/ships/' + Admin.ship._id);
    });
  });
}

exports.edit = function(success){
  
  // var ship = Admin.ships.find(function(s){
  //   return s._id == id;
  // });
  ship = Admin.ship;
  
  var partials = {
    'admin-ships-form': ss.tmpl['admin-ships-form']
  };
  var html = ss.tmpl['admin-ships-edit'].render({
    ship: ship,
    typesList: utilities.mustachizeSelect('type', typesList, ship),
    drivesList: utilities.mustachizeSelect('drive', drivesList, ship),
    weaponsList: utilities.mustachizeSelect('weapons', weaponsList, ship)
  }, partials);
  
  
  $('#content').html(html);
  
  var form = $('form#edit-ship-form');
  
  form.on('keyup', function(e){
    e.preventDefault();
    clearTimeout(Admin.timer);
    Admin.timer = setTimeout(function(){ 
      submitUpdate(ship._id, form); 
    }, 300);
  });
   
  form.on('submit', function(e){
    e.preventDefault();
    submitUpdate(ship._id, form);
  });

}

var submitUpdate = function(id, form){
  var params = utilities.jsonifyParams(form.serializeArray());
  ss.rpc('ships.update', id, params, function(success){
    console.log(success);
  });
};
    
    






