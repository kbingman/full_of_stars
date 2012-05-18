var resourceful = require('resourceful'), 
    Ship = require('./ship').Ship;
    System = require('./system').System;

var Player = resourceful.define('player', function () {

  var self = this;
  
  this.use('mongodb', {
    uri: resourceful.db, 
    collection: 'players', 
    safe: true
  });
  
  this.property('name', String);
  this.property('slug', String);
  // this.property('homeworldId', String);
  // this.property('systems', Array);
  this.property('ships', Array);
  this.property('bankAccount', Number);
  // self.property('resources', Object);
  
  // this.property('rareEarthMetals', Number)
  // this.property('minerals', Number)
  // this.property('fuel', Number)
  
  // Before Create 
  this.before('create', function(player, callback) {
    player.bankAccount = 1000000000;
    player.ships = [];
    player.slug = player.name.toLowerCase().replace(/ /g, '-');
    callback();

    // System.find({'planets.klass':/terran/i}, function(err, systems){ 
    //   var index = Math.ceil(Math.random() * systems.length);
    //   var system = systems[index];
    // 
    //   player.homeworld_id = system ? system._id.toString() : null;
    //   // system.player_id = player._id;
    //   callback();
    // });
  });
  
  // self.prototype.homeworld = function(callback){
  //   var id = this.homeworld_id; 
  //   System.get(id, function(err, homeworld){
  //     if(err){
  //       callback(err);
  //       return;
  //     }
  //     callback(null, homeworld);
  //   });
  // };
   
});

exports.Player = Player;


