require('director');

var ships = require('/controllers/ships'),
    map = require('/controllers/map'),
    system = require('/controllers/systems'),
    tactical = require('/presenters/systems/tactical');

var routes = {
  '/map': map.show,
  '/tactical': tactical.present,
  '/systems/:id': system.show,
  '/ships': {
    on: ships.index,
    '/new': ships.new,
    '/:id': function(id){ ss.rpc('ships.show', id); }
  }
};

window.router = Router(routes);
// window.router.configure({ html5history: true });
window.router.init();
