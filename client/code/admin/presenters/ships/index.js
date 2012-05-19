exports.present = function(ships){
  var html = ss.tmpl['admin-ships-index'].render({
    ships: ships
  });

  $('#content').html(html);
  
  $('a.delete').on('click', function(e){
    e.preventDefault();
    var id = $(e.target).data('id');
    
    ss.rpc('ships.destroy', id, function(success){
      console.log(success);
      window.router.dispatch('on', '/ships');
    });
  });
  
  return;
}



