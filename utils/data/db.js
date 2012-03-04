//basic mongodb connection
var mongodb = require('mongodb');
var	host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var	port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongodb.Connection.DEFAULT_PORT;

var db = new mongodb.Db('cdr', new mongodb.Server(host, port, {}));



exports.init = function(callback){
	db.open(function(err,db){
		db.collection('sheet1', function(err,collection){
			callback(err,collection);
		});
	});
};