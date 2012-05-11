// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
});

Sector = {};

console.log('map')

ss.server.on('ready', function(){
  
  // Wait for the DOM to finish loading
  jQuery(function(){
    require('/app');
    
    ss.rpc('demo.getSystems');

  });

});
