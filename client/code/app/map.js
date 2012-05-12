/* QUICK CHAT DEMO */

// Delete this file once you've seen how the demo works

// Listen out for newMessage events coming from the server
ss.event.on('systems', function(systems) {
  console.log(systems.length)
  Sector.systems = systems;
  
  var html = ss.tmpl['systems-map'].render({
    systems : systems.map(function(system){
      system.x = system.x - 24;
      system.y = system.y - 24;
      system.slug = system.stars[0].klass.toLowerCase();
      return system;
    })
  });
  
  return $('#content').html(html);
});



