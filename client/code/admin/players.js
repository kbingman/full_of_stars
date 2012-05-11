// Main systems index view
ss.event.on('players', function(players) {
  
  Admin.players = players;
  
  return $('#content').html(html);
});

exports.showPlayers = function(){
  var players = Admin.players.map(function(player){
    return player;
  });

  var html = ss.tmpl['admin-systems-index'].render({
    // players: player
  });
  $('#content').html(html);
}

