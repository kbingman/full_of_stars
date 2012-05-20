exports.present = function(){
  var partials = {}
  var html = ss.tmpl['login-signup'].render({}, partials);
  
  $('#content').html(html);
  
  $('form#signup').submit(function(e){
    e.preventDefault();

    var params = {
      password: $(this).find('input#player-password').val(),
      name: $(this).find('input#player-name').val()
    }
    
    ss.rpc('app.signup', params, function(success){
      if(success){
        window.location.pathname = '/'
      } else {
        alert('not logged in')
      }
    });
  });
  return
}
