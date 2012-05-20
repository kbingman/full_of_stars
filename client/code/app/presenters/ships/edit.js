var utilities = require('/utilities'),
    defaults = require('ship_defaults').defaults;

exports.present = function(ship){
  var partials = {
    'admin-ships-ship': ss.tmpl['app-ships-ship'],
    'admin-ships-form': ss.tmpl['app-ships-form'],
    'admin-forms-select': ss.tmpl['admin-forms-select'],
    'admin-forms-input': ss.tmpl['admin-forms-input'],
    'admin-forms-radio': ss.tmpl['admin-forms-radio']
  }
  var html = ss.tmpl['app-ships-edit'].render(exports.context(ship), partials);
  
  $('#content').html(html);
  
  // Events

  $('fieldset.list button').on('click', function(e){
    e.preventDefault();
    var fieldset = $(this).parents('fieldset');
    var value = fieldset.find('select').val();
    
    Sector.ship.weapons.push(value);
    
    ss.rpc('ships.update', Sector.ship._id, { weapons: Sector.ship.weapons }, function(success){
      console.log(success);
      window.router.dispatch('on', '/ships/' + Sector.ship._id);
    });
  });
  
  $('fieldset.list a.remove').on('click', function(){
    var value = $(this).prev('span').text();
    Sector.ship.weapons = Sector.ship.weapons .remove(function(w){
      return w == value;
    });
    ss.rpc('ships.update', Sector.ship._id, { weapons: Sector.ship.weapons }, function(success){
      console.log(success);
      window.router.dispatch('on', '/ships/' + Sector.ship._id);
    });
  });
  
  var form = $('form#edit-ship-form');
  form.find('div.radio button.btn').popover({ placement: 'bottom' });
  
  utilities.setFormActions(Sector.ship, form);
  
}

exports.context = function(ship){
  ship = ship || {};
  return {
    ship: ship,
    // usc: ship.usc(),
    model: 'ship',
    price: ship.price ? ship.price.format() : 0,
    name: { 
      name: 'name',
      label: 'Name',
      value: ship.name,
      list: [],
      helpText: ship.helpText('name')
    },
    type: {
      name: 'type',
      label: 'Type',
      value: ship.type,
      list: utilities.mustachizeSelect('type', defaults.type, ship),
      helpText: ship.helpText('type')
    },
    size: {
      name: 'size',
      label: 'Size',
      value: ship.size,
      list: utilities.mustachizeSelect('size', defaults.size, ship),
      helpText: ship.helpText('size')
    },
    shape: {
      name: 'shape',
      label: 'Configuration',
      value: ship.shape,
      list: utilities.mustachizeSelect('shape', defaults.shape, ship),
      helpText: ship.helpText('shape')
    },
    jump: {
      name: 'jump',
      label: 'Jump',
      value: ship.jump,
      list: utilities.mustachizeSelect('jump', defaults.jump, ship),
      helpText: ship.helpText('jump')
    },
    sublight: {
      name: 'sublight',
      label: 'Sublight',
      value: ship.sublight,
      list: utilities.mustachizeSelect('sublight', defaults.sublight, ship),
      helpText: ship.helpText('sublight')
    },
    weapons: ship.weapons ? ship.weapons.map(function(w){ return { name: w, index: ship.weapons.indexOf(w) }}) : [],
    weaponsList: defaults.weapons,
    weaponsSentence: ship.weapons.toSentence(),
    defensesList: []
  }
}
