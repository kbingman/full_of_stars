/* QUICK CHAT DEMO */

// Delete this file once you've seen how the demo works

// Listen out for newMessage events coming from the server
ss.event.on('allSystems', function(systems) {
  console.log(systems.length)
  Sector.systems = systems;
  
  var html = ss.tmpl['systems-map'].render({
    systems : systems.map(function(system){
      system.slug = system.stars[0].klass.toLowerCase();
      return system;
    })
  });
  
  return $('#content').html(html);
});



