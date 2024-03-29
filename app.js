var http = require('http'),
    ss = require('socketstream'),
    resourceful = require('resourceful'),
    Mongodb = require('./server/lib/mongodb').Mongodb;
    
ss.session.options.maxAge = 8640000 * 5;
    
// Define the main single-page client
ss.client.define('main', {
  view: 'app.html',
  css:  ['libs/bootstrap', 'shared', 'app'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'app', 'system'],
  tmpl: ['app']
});

// Define the admin single-page client
ss.client.define('admin', {
  view: 'admin.html',
  css:  ['libs/bootstrap/bootstrap.css','libs/bootstrap/bootstrap-responsive.css', 'shared', 'admin'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'admin', 'system'],
  tmpl: ['admin']
});

// Define the login single-page client
ss.client.define('login', {
  view: 'login.html',
  css:  ['libs/bootstrap/bootstrap.css','libs/bootstrap/bootstrap-responsive.css', 'login'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'login'],
  tmpl: ['login']
});

// This is the only url that is not protected
ss.http.route('/login', function(req, res){
  if(req.session.userId){
    res.writeHead(302, { 'Location': '/' });
    res.end();
  } else {
    res.serveClient('login');
  }
});

// Serve this client on the admin URL
ss.http.route('/', function(req, res){
  if(req.session.userId){
    res.serveClient('main');
  } else {
    res.writeHead(302, { 'Location': '/login' });
    res.end();
  }
});

// Serve this client on the admin URL
ss.http.route('/admin', function(req, res){
  if(req.session.userId){
    res.serveClient('admin');
  } else {
    res.writeHead(302, { 'Location': '/login' });
    res.end();
  }
});

// Code Formatters
ss.client.formatters.add(require('ss-less'));
// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

//register engine with resourceful
resourceful.engines.Mongodb = Mongodb;

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env == 'production'){
  ss.client.packAssets();
  ss.session.store.use('redis', {
    host: 'panga.redistogo.com', 
    port: 9538, 
    pass: '351ce528621de5837d0f6c7828789ad2'
  });
  ss.publish.transport.use('redis', {
    host: 'panga.redistogo.com', 
    port: 9538, 
    pass: '351ce528621de5837d0f6c7828789ad2'
  });
  resourceful.db = 'mongodb://fullofstars:123456@staff.mongohq.com:10057/fullOfStars';
} else if (ss.env == 'development') {
  resourceful.db = 'mongodb://localhost/planetary'; 
} else {
  resourceful.db = 'mongodb://localhost/planetary_test'; 
}


var server = http.Server(ss.http.middleware);
server.listen(3000);
// Start SocketStream
ss.start(server);
