exports.present = function(ships){
  var html = ss.tmpl['admin-ships-index'].render({
    ships: ships
  });

  $('#content').html(html);
}



