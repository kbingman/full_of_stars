exports.present = function(players){
  
  var html = ss.tmpl['admin-players-index'].render({
    players: players
  });
  
  $('#content').html(html);
  
  $('#players a').on('click', function(e){
    e.preventDefault();
    window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
  });
  
  return 
  
}
