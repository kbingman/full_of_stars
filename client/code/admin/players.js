// Main systems index view
ss.event.on('players', function(players) {
  
  Admin.players = players;
  
  var html = ss.tmpl['admin-players-index'].render({
    players : players.map(function(player){
      return player;
    })
  });
  
  return $('#content').html(html);
});
