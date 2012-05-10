// Define actions which can be called from the client using ss.rpc('systems.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    getPlayers: function() {
      Player.all(function(error, players){
        if(error){
          return res(false)
        }
        ss.publish.all('players', players);
        return res(true)
      });
    }, 
    
    createPlayer: function(params){

    }

  };

};
