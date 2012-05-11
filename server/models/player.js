var resourceful = require('resourceful'),
    sugar = require('sugar'),
    Ship = require('./ship').Ship;
    System = require('./system').System;

var Player = resourceful.define('player', function () {

  var self = this;
  
  self.property('name', String);
  self.property('slug', String);
  self.property('homeworld_id', String);
  self.property('systems', Array);
  self.property('ships', Array);
  self.property('bank_account', Number);
  // self.property('resources', Object);
  
  self.property('rareEarthMetals', Number)
  self.property('minerals', Number)
  self.property('fuel', Number)
  
  // Before Create 
  self.before('create', function(player, callback) {
    player.bank_account = 1000000000;
    player.ships = [];
    player.slug = player.name.toLowerCase().replace(/ /g, '-');
    

    System.find({'planets.klass':/terran/i}, function(err, systems){ 
      var index = Math.ceil(Math.random() * systems.length);
      var system = systems[index];

      player.homeworld_id = system ? system._id.toString() : null;
      // system.player_id = player._id;
      callback();
      // self.build_ship(player, callback);
    });
  });
  
  // Builds 
  self.prototype.build_ship = function(callback){
    var player = this;
    
    System.get(player.homeworld_id, function(err, homeworld){
      
      console.log(homeworld.x)
      var ship = new Ship({ 
        player_id: player.id,
        x: homeworld.x,
        y: homeworld.y
      });
      ship.save(function(err, ship){
        if(err){
          console.log(err);
          callback(err, player);
          return;
        }
        player.ships.push(ship.toJSON());
        callback(null, player);
      });
    });
  }
  
  self.prototype.homeworld = function(callback){
    var id = this.homeworld_id; 
    System.get(id, function(err, homeworld){
      if(err){
        callback(err);
        return;
      }
      callback(null, homeworld);
    });
  };
   
});

exports.Player = Player;


