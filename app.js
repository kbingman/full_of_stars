var http = require('http'),
    ss = require('socketstream'),
    resourceful = require('resourceful-mongo');
    
// Define the main single-page client
ss.client.define('main', {
  view: 'app.html',
  css:  ['libs/bootstrap', 'shared', 'app'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'app', 'system'],
  tmpl: '*'
});

// Define the admin single-page client
ss.client.define('admin', {
  view: 'admin.html',
  css:  ['libs/bootstrap/bootstrap.css','libs/bootstrap/bootstrap-responsive.css', 'shared', 'admin'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'admin', 'system'],
  tmpl: '*'
});

// Define the admin single-page client
ss.client.define('login', {
  view: 'login.html',
  css:  ['libs/bootstrap/bootstrap.css','libs/bootstrap/bootstrap-responsive.css', 'login'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'login'],
  tmpl: '*'
});


// Serve this client on the admin URL
ss.http.route('/login', function(req, res){
  res.serveClient('login');
});



// Serve this client on the admin URL
ss.http.route('/', function(req, res){
  if(req.session.userId){
    res.serveClient('main');
  } else {
    res.serveClient('login');
    res.writeHead(302, { 'Location': '/login' });
    res.end();
  }
});


// Serve this client on the admin URL
ss.http.route('/admin', function(req, res){
  if(req.session.userId){
    res.serveClient('admin');
  } else {
    res.serveClient('login');
    res.writeHead(302, { 'Location': '/login' });
    res.end();
  }
});

// Code Formatters
ss.client.formatters.add(require('ss-less'));
// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env == 'production'){
  ss.client.packAssets();
  // ss.session.store.use('redis', {
  //   host: 'panga.redistogo.com', 
  //   port: 9538, 
  //   pass: '351ce528621de5837d0f6c7828789ad2'
  // });
  // ss.publish.transport.use('redis', {
  //   host: 'panga.redistogo.com', 
  //   port: 9538, 
  //   pass: '351ce528621de5837d0f6c7828789ad2'
  // });
  // resourceful.db = 'mongodb://fullofstars:123456@staff.mongohq.com:10057/fullOfStars';
  resourceful.db = 'mongodb://localhost/planetary'; 
} else if (ss.env == 'development') {
  resourceful.db = 'mongodb://localhost/planetary'; 
} else {
  resourceful.db = 'mongodb://localhost/planetary_test'; 
}

// Open the mongodb connection
resourceful.use('mongodb', {
  uri: resourceful.db, // required - the connection to be opened
  onConnect: function (err) { // required - the callback upon opening the database connection
    // Start SocketStream
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
