var flatiron = require('flatiron'),
    app = flatiron.app,
    ss = require('socketstream'),
    resourceful = require('resourceful-mongo');
    
app.use(flatiron.plugins.http);
// app.http.before.push(ss.http.middleware);
        
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
  css:  ['libs/bootstrap/bootstrap.css','libs/bootstrap/bootstrap-responsive.css', 'admin'],
  code: ['libs/jquery.min.js', 'libs/bootstrap.js', 'admin', 'system'],
  system: '*',
  tmpl: '*'
});

// Serve this client on the root URL
app.router.get('/', function () {
  this.res.json({ 'hello': 'world' });
  // this.res.serveClient('main');
});

lient on the admin URL
app.router.get('/admin', function () {
  this.res.json({ 'hello': 'world' });
  // this.res.serveClient('admin');
});




// Code Formatters
ss.client.formatters.add(require('ss-less'));
// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

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


// Open the mongodb connection
resourceful.use('mongodb', {
  uri: resourceful.db, // required - the connection to be opened
  onConnect: function (err) { // required - the callback upon opening the database connection
    // Start SocketStream
    if(!err){
      // Start web server
      app.listen(3000);
      // Start SocketStream
      ss.start(app);
    }
  }
});
