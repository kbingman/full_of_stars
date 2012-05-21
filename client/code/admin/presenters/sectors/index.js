var utilities = require('/utilities');

exports.present = function(sectors){

  var sectors = sectors.map(function(sector){
    sector.size = sector.systemIds.length;
    return sector;
  });
  var partials = { 
    'admin-sectors-new': ss.tmpl['admin-sectors-new'] 
  };
  var html = ss.tmpl['admin-sectors-index'].render({
    sectors: sectors
  }, partials);

  $('#content').html(html);
  
  // Events
  $('form#new-sector-form').on('submit', function(e){
    e.preventDefault();

    var params = utilities.jsonifyParams($(this).serializeArray());
  
    ss.rpc('sectors.create', params, function(success){
      console.log(success)
    });
  });
}