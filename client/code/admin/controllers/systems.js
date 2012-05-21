var systemPresenter = require('/presenters/sectors/system');
    
exports.show = function (systemId) { 
  var system = Admin.systems.find(function(s){
    return s._id == systemId;
  });
  if(system){
    systemPresenter.present(system);
  }
};


