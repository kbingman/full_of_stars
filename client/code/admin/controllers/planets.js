var planetPresenter = require('/presenters/sectors/planet');

exports.show = function (systemId, id) { 
  var system = Admin.systems.find(function(s){
    return s._id == systemId;
  });
  
  if(system){
    var planet = system.planets.find(function(p){
      return p._id == id;
    });
    planetPresenter.present(system, planet);
  }
};
