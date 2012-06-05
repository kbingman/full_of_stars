var presenter = require('/presenters/systems/show');

exports.show = function(id){
  var system = Sector.systems.find(function(s){
    return s._id == id;
  });
  presenter.present(system);
}
