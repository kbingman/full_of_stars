require('director');

var players = require('/players'),
    sectors = require('/sectors'),
    systems = require('/systems'),
    planets = require('/planets');

var routes = {
  '/sectors': {
    on: function(){ ss.rpc('sectors.all'); },
    '/:id': function(id){ ss.rpc('sectors.show', id); },
  },
  '/systems': {
    '/:systemId': {
      on: systems.show,
      '/planets/:id': {
        on: planets.show
      }
    }
  },
  // '/ships': {
  //   on: function(){ ss.rpc('ships.all'); },
  //   '/new': ships.new,
  //   '/:id': function(id){ ss.rpc('ships.show', id); }
  // },
  '/players': {
    on: function(){ ss.rpc('players.all'); },
    '/:id': {
      on: players.show
    }
  }
  
};

window.router = Router(routes);
// window.router.configure({ html5history: true });
window.router.init();


