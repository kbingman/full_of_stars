var resourceful = require('resource-mongodb'),
    sugar = require('sugar'),
    System = require('./system').System;

var Sector = resourceful.define('sector', function () {

  var self = this;
  
  this.property('name', String);
  this.property('x', Number);
  this.property('y', Number);
  this.property('y', Number);
  this.property('width', Number);
  this.property('height', Number);
  this.property('depth', Number);
  
  // Before Create 
  this.before('create', function(sector, callback) {

  });
  
  this.createSystem = function(){
    x = parseInt(Math.random() * this.width) + this.x;
    y = parseInt(Math.random() * this.height) + this.y;
    z = parseInt(Math.random() * this.depth) + this.z;
  }
  
   
});

exports.Sector = Sector;

