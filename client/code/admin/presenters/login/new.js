exports.present = function(){
  var partials = {}
  var html = ss.tmpl['admin-login-new'].render({}, partials);
  
  $('#content').html(html);
  
  $('form#signup').submit(function(e){
    e.preventDefault();

    var params = {
      password: $(this).find('input#player-password').val(),
      name: $(this).find('input#player-name').val()
    }
    
    ss.rpc('app.signup', params, function(success){
      console.log(success)
      window.router.dispatch('on', '/ships')
      window.router.setRoute('/ships');
    });
  });
  return
}
