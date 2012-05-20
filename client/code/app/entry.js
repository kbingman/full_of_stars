// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
});


Sector = {};
Sector.scale = 3;

ss.server.on('ready', function(){
  
  // Wait for the DOM to finish loading
  jQuery(function(){
    
    require('sugar');
    require('array');
    require('/router');
    require('/controllers/map');
    require('/controllers/player');
        
    $('.nav a').on('click', function(e){
      e.preventDefault();
      window.router.dispatch('on', $(e.currentTarget).attr('href').replace('#',''));
    });
    
  });

});
