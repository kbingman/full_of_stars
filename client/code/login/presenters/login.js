var signup = require('/presenters/signup');


exports.present = function(){
  var partials = {}
  var html = ss.tmpl['login-login'].render({}, partials);
  
  $('#content').html(html);
  
  $('a#signup').on('click', function(e){
    e.preventDefault();
    signup.present();
  });
  
  $('form#login').submit(function(e){
    e.preventDefault();
    
    var password = $(this).find('input#player-password').val(),
        username = $(this).find('input#player-name').val();
        
    ss.rpc('app.authenticate', username, password, function(success){
      if(success){
        window.location.pathname = '/'
      } else {
        alert('not logged in')
      }
    });
  });
  return
}
