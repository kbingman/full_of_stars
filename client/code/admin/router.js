require('director');

var players = require('/controllers/players'),
    sectors = require('/controllers/sectors'),
    systems = require('/controllers/systems')
    planets = require('/controllers/planets');

var routes = {
  // '/': function(){ alert('root!')},
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


