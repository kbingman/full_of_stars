require('resourceful');

var Ship = resourceful.define('ship', function () {
  this.use('memory');
  
  this.property('name', String);
  this.property('price', String);

  this.property('slug', String);
  this.property('player_id', String);
  this.property('number', Number)
  
  this.property('paths', Array);
  this.property('speed', Number);
  this.property('x', Number);
  this.property('y', Number);
  
  this.property('type', String)
  
  this.property('speed', Number);
  this.property('scienceLevel', Number);
  
  this.property('size', String);
  this.property('shape', String);
  this.property('armor', Array);
  this.property('weapons', Array);
  this.property('drive', String);
  this.property('fuel', String);
  
  this.prototype.usc = function(){
    return 'code';
  };
});

Ship.prototype.update = function(callback){
  var self = this;

  this.save(function(err, ship){
    var params = self.toJSON();
    delete params['_id'];
    callback(err, ship)
    ss.rpc('ships.update', self.id, params, function(success){
      console.log(success);
    });
  });
}

Ship.prototype.helpText = function(attr){
  var text = {
    'name'    : 'The Class name.',
    'shape'   : 'Shape',
    'size'    : 'Size and Base price',
    'type'    : 'The basic use of you ship, i.e. War, Exploration, Transport, etc.',
    'jump'    : 'Maximum range in parsecs per jump.',
    'sublight': 'Maximum accelleration in Gs.',
    'weapons' : 'More types are available with better science. Invest wisely.',
    'defenses': 'Does not work yet.'
  }
  return text[attr]
}

exports.Ship = Ship;
