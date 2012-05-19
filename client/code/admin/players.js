var utilities = require('/utilities'),
    indexPresenter = require('/presenters/players/index'),
    showPresenter = require('/presenters/players/show');

ss.event.on('players', function(players) {
  Admin.players = players;
  
  indexPresenter.present(players);
  return 
});

// Main systems index view
ss.event.on('login', function(player) {
  Admin.player = player;
  
  return 
});

ss.event.on('updatePlayer', function(player){
  Admin.players = Admin.players.remove(function(p){
    return p._id == player._id;
  });
  Admin.players.push(player);
  indexPresenter.present(Admin.players);

  return
})

exports.show = function (id) { 
  var player = Admin.players.find(function(p){
    return p._id == id;
  });
  if(player){
    showPresenter.present(player);
  }
};





