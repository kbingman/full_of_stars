var systems = require('/systems');
var players = require('/players');

var routes = {
  '/systems': {
    on: function(){ ss.rpc('systems.getSystems'); },
    '/:systemId': {
      on: systems.showSystem,
      '/planets/:id': {
        on: systems.showPlanet
      }
    }
  },
  '/players': {
    on: players.showPlayers,
    '/:id': {
      on: players.showPlayer
    }
  }
  
};

window.router = Router(routes);
// window.router.configure({ html5history: true });
window.router.init();
