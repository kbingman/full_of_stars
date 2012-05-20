exports.present = function(players){
  
  var html = ss.tmpl['admin-players-index'].render({
    players: players
  });
  
  $('#content').html(html);
  
  $('#players td.name a').on('click', function(e){
    e.preventDefault();
    window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
  });
  
  $('#players a.delete').on('click', function(e){
    e.preventDefault();
    var id = $(e.target).data('id');
    
    ss.rpc('players.destroy', id, function(success){
      console.log(success);
      window.router.dispatch('on', '/players');
    });
  });
  
  
  return 
  
}
