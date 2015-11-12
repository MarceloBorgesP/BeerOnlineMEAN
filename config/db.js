module.exports = {
	url : 'mongodb://marcelobp93:database123@ds039404.mongolab.com:39404/beeronline'
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://marcelobp93:database123@ds039404.mongolab.com:39404/beeronline';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});