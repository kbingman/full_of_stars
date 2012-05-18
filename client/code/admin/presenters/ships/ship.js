var utilities = require('/utilities');
var defaults = require('ship_defaults').defaults;

exports.context = function(ship){
  ship = ship || {};
  return {
    ship: ship,
    // usc: ship.usc(),
    model: 'ship',
    price: ship.price.format(),
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
      helpText: ship.helpText('type')
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
    },
    weapons: ship.weapons ? ship.weapons.map(function(w){ return { name: w, index: ship.weapons.indexOf(w) }}) : [],
    weaponsList: defaults.weapons,
    weaponsSentence: ship.weapons.toSentence(),
    defensesList: []
  }
}
