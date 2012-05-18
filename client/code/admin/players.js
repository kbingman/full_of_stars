// Main systems index view
ss.event.on('players', function(players) {
  Admin.players = players;
  
  var html = ss.tmpl['admin-players-index'].render({
    players: players
  });
  
  $('#content').html(html);
  
  return 
});

// Main systems index view
ss.event.on('login', function(player) {
  Admin.player = player;
  return 
});




// exports.showPlayers = function(){
//   var players = Admin.players.map(function(player){
//     return player;
//   });
// 
//   var html = ss.tmpl['admin-players-index'].render({
//     // players: player
//   });
//   $('#content').html(html);
// }

