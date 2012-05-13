var resourceful = require('resourceful-mongo'),
    Star = require('./star').Star,
    Planet = require('./planet').Planet,
    async = require('async'),
    sugar = require('sugar');
    
var System = resourceful.define('system', function () {
  
  this.use('mongodb', {
    uri: resourceful.db, 
    collection: 'systems', 
    safe: true
  });
  
  var self = this;
    
  // Properties with validation
  this.property('name', String); // Defaults to String
  this.property('x', Number);
  this.property('y', Number);
  this.property('z', Number);
  this.property('orbits', Object);
  this.property('mass', Number); 
  this.property('planets', Array); 
  this.property('stars', Array); 
  this.property('sectorId', String); 
  this.property('clustered', Boolean);
  
  self.timestamps();
  
  // Hooks
  this.before('create', function(instance, callback) {
    
    instance.name = instance.x + ':' + instance.y + ':' + instance.z;
    instance.orbits = {};
    instance.clustered  = false;
    instance.stars = [];
    instance.planets = [];
    instance.mass = 0;
  
    // Stars
    // about 50% need to be multiple stars
    self.create_stars(instance, function(){
      self.create_planets(instance, callback);
    });
  });
  
  // Create Stars
  // ----------------------------------------------------------------
  this.create_stars = function(instance, callback){
    Star.create({}, function(err, star){
      instance.stars.push(star.toJSON());
      instance.mass = instance.mass + star.mass;
      
      callback();
    });
  };
  
  // Create Planets
  // ----------------------------------------------------------------
  this.create_planets = function(instance, callback){
    var zones = [],
        index = 0,
        star = instance.stars.first(),
        orbits = Star.types.find(function(type){
          return type.name == star.klass
        }).orbits,
        create_planet = function(zone, done){
          Planet.create({ zone: zone, position: index }, function(err, p){ 
            instance.planets.push(p.toJSON());
            done();
          });
          index++; 
        };
          
    // Calculates probability of planets in each zone
    Object.extended(orbits).each(function(key, value){
      var slot_probabilty = (Math.random() * 2) + .5;
      var slots = Math.round(value * Math.sqrt(instance.mass) * slot_probabilty);

      (slots).times(function(i){
        zones.push(key);
      })
      instance.orbits[key] = slots;    
    });
      
    async.forEach(zones, create_planet, function(err){
      if(err){ console.log(err); }
      callback();
    });
  };
  
  // Instance Methods
  
  self.prototype.planets_collection = function(){
    var system = this;
    var planets = system.planets.map(function(p){ 
      return new Planet(p);
    });
    return planets;
  };
  
  
  // ----------------------------------------------------------------
  self.prototype.cluster = function(callback){
    
    var instance = this;
    
    var star = instance.stars[0];
    var mass = instance.mass;
    var attraction_radius = mass * 72; 
    console.log(attraction_radius)
    
    var x1 = instance.x - attraction_radius;
    var x2 = instance.x + attraction_radius;
    var y1 = instance.y - attraction_radius;
    var y2 = instance.y + attraction_radius;
    var conditions = { $and: [{'x':{ $gte: x1 }},  {'x':{ $lte: x2 }}, {'y':{ $gte: y1 }},  {'y':{ $lte: y2 }}] };
    // var conditions = { $and: [{'x':{ $gte: x1 }},  {'x':{ $lte: x2 }}, {'y':{ $gte: y1 }},  {'y':{ $lte: y2 }}, {'mass': { $lt: mass }}] };
    // Needs to find nearby systems
    
    self.find(conditions, function(err, systems){ 
      if(err) callback.call(this, err, instance);
      console.log(systems.length)
      var clusterer = function(system, done){
        var delta_x = instance.x - system.x;
        var delta_y = instance.y - system.y;
        var length = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2)); 
        
        // console.log("Delta X: " + delta_x)
        // console.log("Delta Y: " + delta_y)
  
        // This is more or less arbitrary and I just made it up
        // The equation, though, plots a point on the line between the two stars and
        // returns its coordinates
        var n = (Math.sqrt(length) * Math.sqrt(mass) * 1.3);
        var m = length - n;
        var x = ((m * instance.x) + (n * system.x))/(m + n);
        var y = ((m * instance.y) + (n * system.y))/(m + n);
        
        console.log('old x: ' + instance.x)
        console.log('mew x: ' + Math.round(x))
          
        instance.x = Math.round(x);
        instance.y = Math.round(y);
        done();
      }
      
      if(systems && systems.length){
        async.forEach(systems, clusterer, function(err){
          if(err){
            callback(err);
            return;
          } 
          instance.clustered = true; 
          callback(null, instance);
        });
      } else {
        instance.clustered = true; 
        callback(null, instance);
      }
    });    
  } 
  // ---------------------------------------------------------------- 
  
});

exports.System = System;
