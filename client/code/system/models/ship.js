require('resourceful');

var Ship = resourceful.define('ship', function () {
  
  this.property('name', String);
  this.property('price', String);

});

Ship.weapons = [
  { name: 'Ship to Ship Missles' },
  { name: 'Planetary Bombardment Missles' },
  { name: 'Rail Guns' },
  { name: 'Lasers (really?)' },
  { name: 'Plasma Cannons' },
  { name: 'Gamma Cannons' }
];

Ship.sizes = [
  { name: "Small", size: "100" },
  { name: "Medium", size: "1000" },
  { name: "Large", size: "10,000" },
  { name: "X-Large", size: "100,000" },
  { name: "Immense", size: "1,000,00" },
  { name: "Really really huge", size: "10,000,00" },
  { name: "That's no Moon", size: "100,000,000" }
];

Ship.shapes = [
  { name: "Sphere" },
  { name: "Saucer" },
  { name: "Cone" },
  { name: "Needle" },
  { name: "Wedge" },
  { name: "Cube / Box" },
  { name: "Despersed" },
  { name: "Ring" }
];


Ship.types = [
  { name: 'Scout' },
  { name: 'Colony' },
  { name: 'Cargo' },
  { name: 'Mining' },
  { name: 'Science' },
  { name: 'Close Escort' },
  { name: 'Cruiser' },
  { name: 'Destroyer' },
  { name: 'Battle Station' }
];
  
Ship.drives = [
  { name: 'Sublight In-System' },
  { name: 'Sublight (40% C)' },
  { name: 'High Accelleration Sublight (80% C)' },
  { name: 'High Accelleration Sublight (99% C)' },
  { name: 'Jump' }
];


exports.Ship = Ship;
