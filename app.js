var http = require('http'),
    ss = require('socketstream'),
    resourceful = require('resourceful-mongo');
        
// Define a single-page client
ss.client.define('main', {
  view: 'app.html',
  css:  ['libs/bootstrap', 'index.css'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'app'],
  system: '*',
  tmpl: '*'
});

// Define a single-page client
ss.client.define('admin', {
  view: 'admin.html',
  css:  ['libs/bootstrap', '/admin'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'admin', 'system'],
  system: ['models/weapons.js'],
  tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('main');
});

// Serve this client on the admin URL
ss.http.route('/admin', function(req, res){
  res.serveClient('admin');
});

// Code Formatters
ss.client.formatters.add(require('ss-less'));
ss.client.templateEngine.use(require('ss-hogan'));

// Production settings: SS_ENV=production node app.js
if (ss.env == 'production'){
  ss.client.packAssets();
  var redisCredentials =  {
    host: 'panga.redistogo.com', 
    port: 9538, 
    pass: '351ce528621de5837d0f6c7828789ad2'
  }
  ss.session.store.use('redis', redisCredentials);
  ss.publish.transport.use('redis', redisCredentials);
  resourceful.db = 'mongodb://fullofstars:123456@staff.mongohq.com:10057/fullOfStars';
} else if (ss.env == 'development') {
  resourceful.db = 'mongodb://localhost/planetary'; 
} else {
  resourceful.db = 'mongodb://localhost/planetary_test'; 
}

// Open the mongodb connection
resourceful.use('mongodb', {
  uri: resourceful.db, 
  onConnect: function (err) { 
    if(!err){
      console.log('connected')
      // Start web server
      var server = http.Server(ss.http.middleware);
      server.listen(3000);
      // Start SocketStream
      ss.start(server);
    }
  }
});
