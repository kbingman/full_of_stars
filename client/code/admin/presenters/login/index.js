exports.present = function(){
  var partials = {}
  var html = ss.tmpl['admin-login-index'].render({}, partials);
  
  $('#content').html(html);
  
  $('form#login').submit(function(e){
    e.preventDefault();
    
    var password = $(this).find('input#player-password').val(),
        username = $(this).find('input#player-name').val();
        
    ss.rpc('app.authenticate',username, password, function(success){
      console.log(success)
      if(success){
        window.router.dispatch('on', '/ships')
        window.router.setRoute('/ships');
        
      } else {
        alert('not logged in')
      }
    });
  });
  return
}
