var Player = require('../models/player').Player;

exports.actions = function(req, res, ss){

  // tell SocketStream to load session data
  req.use('session');

  return {
    signup: function(params){
      console.log(params)
      Player.create(params, function(error, player){
        
        exports.handleErrors;

        
        req.session.setUserId(player._id);
        ss.publish.all('login', player);
        res(true);
      });
      
    },
    
    authenticate: function(username, password){
      
      Player.find({ name: username, password: password }, function(error, players){
        exports.handleErrors;
        
        var player = players[0];
        if (player) {
          req.session.setUserId(player._id);
          ss.publish.all('login', player);
          res(true);
        } else {
          res('Access denied!');
        }
      });

    },
    
    getCurrentPlayer: function(){
      exports.getCurrentPlayer(req, res, function(error,player){
        exports.handleErrors;
        
        if (player) {
          req.session.setUserId(player._id);
          ss.publish.all('login', player);
          res(true);
        } else {
          res('Access denied!');
        }
        
      });
    },
    
    logout: function(){
      req.session.setUserId(null); 
      res(true);
    }

  }
}

exports.getCurrentPlayer = function(req, res, callback){

  var id = req.session.userId;
  Player.get(id, function(error, player){
    exports.handleErrors;
    
    if (player){
      callback(error, player);
    }
  });
  
}

exports.handleErrors = function(req, res, ss, error){
  if(error){ 
    ss.log('➙'.red, 'error'.red, error); 
    return res(false); 
  }
}

