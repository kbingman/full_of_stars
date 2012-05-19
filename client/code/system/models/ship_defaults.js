var defaults = {
  type: [
    { name: 'Scout', price: 0.5 },
    { name: 'Colony', price: 1 },
    { name: 'Cargo', price: 0.3 },
    { name: 'Mining', price: 0.5 },
    { name: 'Science', price: 1 },
    { name: 'Close Escort', price: 1 },
    { name: 'Cruiser', price: 1 },
    { name: 'Destroyer', price: 1 },
    { name: 'Battleship', price: 2 },
    { name: 'Carrier', price: 4 },   
    { name: 'Battle Station', price: 5 }
  ],
  weapons: [
    { name: 'Ship to Ship Missles', price: 1 },
    { name: 'Planetary Bombardment Missles', price: 1 },
    { name: 'Rail Guns', price: 2 },
    { name: 'Lasers (really?)', price: 1 },
    { name: 'Plasma Cannons', price: 3 },
    { name: 'Gamma Cannons', price: 5 }
  ],
  size: [
    { name: "Small",   size: 100,    price: 100    },
    { name: "Medium",  size: 1000,   price: 1000   },
    { name: "Large",   size: 10000,  price: 10000  },
    { name: "X-Large", size: 100000, price: 100000 },
    { name: "Immense", size: 100000, price: 100000 },
    { name: "Really Really Huge", size: 1000000,   price: 1000000 },
    { name: "That's No Moon",     size: 100000000, price: 100000000 }
  ],
  shape: [
    { name: "Sphere",     price: 1 },
    { name: "Saucer",     price: 1 },
    { name: "Cone",       price: 1 },
    { name: "Needle",     price: 1 },
    { name: "Wedge",      price: 1 },
    { name: "Cube", price: 0.5 },
    { name: "Dispersed",  price: 0.5 },
    { name: "Ring",       price: 1 }
  ],
  sublight: [
    { name: '1',  price: 1 },
    { name: '2',  price: 2 },
    { name: '4',  price: 4 },
    { name: '8',  price: 8 },
    { name: '16', price: 16 },
    { name: '32', price: 32 }
  ],
  jump: [
    { name: '0',    price: 1 },
    { name: '0.25', price: 2 },
    { name: '0.5',  price: 4 },
    { name: '1',    price: 8 },
    { name: '2',    price: 16 },
    { name: '4',    price: 32 }
  ]
};

exports.defaults = defaults; 
