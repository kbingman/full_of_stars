// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
});

ss.rpc('app.getCurrentPlayer', function(success){
  console.log(success)
});

Admin = {
  systems: [],
  players: [],
  ships: [],
  ship: {}
};


ss.server.on('ready', function(){
  
  // Wait for the DOM to finish loading
  jQuery(function(){
    
    require('sugar');
    require('array');
    require('/router');

    
    // if(!Admin.player) {
    //   login.present();
    // }
  

  });

});
