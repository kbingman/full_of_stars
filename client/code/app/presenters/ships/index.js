exports.present = function(ships){
  var html = ss.tmpl['app-ships-index'].render({
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
  
  $('td.name a').on('click', function(e){
    e.preventDefault();
    window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
  });

  return;
}

