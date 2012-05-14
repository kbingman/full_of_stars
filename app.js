// My SocketStream app

var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app,
    ss = require('socketstream'),
    resourceful = require('resourceful-mongo');
    
app.use(flatiron.plugins.http);
app.http.before.push(ss.http.middleware);
        
// Define a single-page client
ss.client.define('main', {
  view: 'app.html',
  css:  ['libs/bootstrap', 'index.css'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'libs/sugar.min.js', 'app'],
  system: '*',
  tmpl: '*'
});

// Define a single-page client
ss.client.define('admin', {
  view: 'admin.html',
  css:  ['libs/bootstrap/bootstrap.css','libs/bootstrap/bootstrap-responsive.css', 'admin.css'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'libs/sugar.min.js', 'admin', 'system'],
  system: ['models/weapons.js'],
  tmpl: '*'
});

// Serve this client on the root URL
app.router.get('/', function () {
  console.log(ss.http.middleware)
  this.res.json({ 'hello': 'world' });
  // this.res.serveClient('main');
});


// Serve this client on the admin URL
app.router.get('/', function () {
  this.res.serveClient('admin');
});


// Code Formatters
// ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env == 'production') ss.client.packAssets();

// redis://nodejitsu:351ce528621de5837d0f6c7828789ad2@panga.redistogo.com:9538/

if (ss.env == 'production'){
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
} else {
  resourceful.db = 'mongodb://localhost/planetary'; 
}

// Start web server

app.start(3000);


// Open the mongodb connection
resourceful.use('mongodb', {
  uri: resourceful.db, // required - the connection to be opened
  onConnect: function (err) { // required - the callback upon opening the database connection
    // Start SocketStream
    if(!err){
      console.log('connected')
      ss.start(app);
    }
  }
});
