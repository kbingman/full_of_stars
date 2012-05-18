var utilities = require('/utilities'),
    Ship = require('ship').Ship,
    defaults = require('ship_defaults').defaults;

exports.present = function(){
  var ship = new Ship();
  var partials = {
    'admin-ships-ship': ss.tmpl['admin-ships-ship'],
    'admin-ships-form': ss.tmpl['admin-ships-form'],
    'admin-forms-select': ss.tmpl['admin-forms-select'],
    'admin-forms-input': ss.tmpl['admin-forms-input'],
    'admin-forms-radio': ss.tmpl['admin-forms-radio']
  }
  var html = ss.tmpl['admin-ships-new'].render(exports.context(ship), partials);
  
  $('#content').html(html);
}

exports.context = function(ship){
  return {
    ship: ship,
    model: 'ship',
    name: { 
      name: 'name',
      label: 'Name',
      value: ship.name,
      helpText: ship.helpText('name')
    },
    type: {
      name: 'type',
      label: 'Type',
      list: utilities.mustachizeSelect('type', defaults.type, ship),
      helpText: ship.helpText('name')
    },
    size: {
      name: 'size',
      label: 'Size',
      list: utilities.mustachizeSelect('size', defaults.size, ship),
      helpText: ship.helpText('size')
    },
    shape: {
      name: 'shape',
      label: 'Configuration',
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
    }
  }
}

