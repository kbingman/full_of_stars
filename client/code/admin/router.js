require('director');

var players = require('/players');
var sectors = require('/sectors');
var systems = require('/systems');
var planets = require('/planets');
var ships = require('/ships');

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
  '/ships': {
    on: function(){ ss.rpc('ships.all'); },
    '/new': ships.new,
    '/:id': function(id){ ss.rpc('ships.show', id); },
    '/:id/edit': ships.edit
  },
  '/players': {
    on: function(){ ss.rpc('players.all'); },
    '/:id': {
      on: players.showPlayer
    }
  }
  
};

window.router = Router(routes);
// window.router.configure({ html5history: true });
window.router.init();
