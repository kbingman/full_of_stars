var utilities = require('/utilities');

exports.present = function(player){
  
  var html = ss.tmpl['admin-players-show'].render({
    player: player
  });

  $('#modal').html(html);
  utilities.openModal();
    
  $('form#edit-player').submit(function(e){
    e.preventDefault();

    var params = utilities.jsonifyParams($(this).serializeArray());

    ss.rpc('players.update', player._id, params, function(success){
      console.log(success);
      $('#modal').find('.modal').modal('hide');
      window.router.setRoute('/players');
    });
  });
   
  return 
  
}
