// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
});

Admin = {
  systems: [],
  players: []
};

ss.server.on('ready', function(){
  
  // Wait for the DOM to finish loading
  jQuery(function(){
    
    require('/router');
    require('/sectors');
    require('/systems');
    require('/players');

  });

});
