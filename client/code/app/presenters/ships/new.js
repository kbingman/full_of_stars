var utilities = require('/utilities'),
    Ship = require('ship').Ship,
    defaults = require('ship_defaults').defaults;

exports.present = function(){
  var ship = new Ship();
  var partials = {
    'app-ships-ship': ss.tmpl['app-ships-ship'],
    'app-ships-form': ss.tmpl['app-ships-form'],
    'app-forms-select': ss.tmpl['app-forms-select'],
    'app-forms-input': ss.tmpl['app-forms-input'],
    'app-forms-radio': ss.tmpl['app-forms-radio']
  }
  var html = ss.tmpl['app-ships-new'].render(exports.context(ship), partials);
  
  $('#content').html(html);
  
  // Events
  $('form#new-ship-form').on('submit', function(e){
    e.preventDefault();
  
    var params = utilities.jsonifyParams($(this).serializeArray());
    
    // Need to add the world of creation here. 
    // for now the Homeworld will do...
    params.x = Sector.homeworld.x;
    params.y = Sector.homeworld.y;

    ss.rpc('ships.create', params, function(success){
      console.log(success);
      window.router.setRoute('/ships/' + Admin.ship._id);
    });
  });
  return;
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

