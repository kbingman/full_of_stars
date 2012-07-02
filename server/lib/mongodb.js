var url = require('url'),
    resourceful = require('resourceful'),
    mongo = require('mongodb-wrapper');
    
var setBsonId = function(id){
  if(id && typeof id === 'string') {
    return {'_id': mongo.ObjectID(id)};
  }
}

exports.connections = {};
exports.deferred = {};

var Mongodb = exports.Mongodb = function Mongodb(config) {
    
  if (config.uri) {
    var uri = url.parse('mongodb://' + config.uri, true);
    config.host = uri.hostname;
    config.port = uri.port;
    
    if (uri.auth) {
      config.user = uri.auth.split(':')[0];
      config.password = uri.auth.split(':')[1]; 
    }
  
    if (uri.pathname) {
      config.database = uri.pathname.replace(/^\/|\/$/g, '');
    }
  
    if (uri.query) {
      resourceful.mixin(config, uri.query);
    }
  }
  
  config.host     = config.host     || '127.0.0.1';
  config.port     = config.port     || 27017;
  config.database = config.database || resourceful.env || 'test';
  config.safe     = (String(config.safe) === 'true'); 
  
  if (exports.connections[config.uri]) {
    this.connection = exports.connections[config.uri];
  } else {
    var db = mongo.db(config.host, config.port, config.database);
    this.connection = exports.connections[config.uri] = db;    
  }
  
  this.config = config;
  this.collection = this.connection.collection(config.collection);
  this.cache = new resourceful.Cache();
};

Mongodb.prototype.protocol = 'mongodb';

Mongodb.prototype.save = function (id, doc, callback) {
  var args = Array.prototype.slice.call(arguments, 0),
      callback = args.pop(),
      doc = args.pop();

  if (args.length) {
    doc._id = setBsonId(id);
  }

  this.collection.save(doc, {safe : this.config.safe}, function(err, doc) {
    if (err) return callback(err);

    if (doc._id) {
      doc._id = doc._id.toString();
    } 

    callback(null, doc);
  });
};

Mongodb.prototype.update = function (id, instance, callback) {
  var self = this;
  
  this.collection.findOne(setBsonId(id), function(err, doc){
    if (err) {
      return callback(err, null);
    }
    
    if (doc) {
      self.collection.update({ id: setBsonId(id) }, instance, function(err, docs){
        return callback(instance.errors, instance);
      });
    }
    else {
      self.collection.save(instance, function(err, docs){
        return callback(err, docs);
      });
    }
    
  });

  // this.collection.update(setBsonId(id), {$set: doc}, {safe : this.config.safe}, function(err) {
  //   if(err) return callback(err);
  // 
  //   // return self.get(id, callback);
  // });
};

Mongodb.prototype.get = function(id, callback) {
  this.collection.findOne(setBsonId(id), callback);
};

Mongodb.prototype.find = function(criteria, callback) {
  this.collection.find(criteria).toArray(callback);
};

Mongodb.prototype.destroy = function(id, callback) {  
  this.collection.remove(setBsonId(id), {safe : this.config.safe}, callback);
};
