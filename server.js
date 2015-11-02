// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var db_mongoose    = mongoose.connection;

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

//SET MONGOOSE UP
db_mongoose.on('error', console.error.bind(console, 'connection error:'));
db_mongoose.once('open', function (callback) {
	var kittySchema = mongoose.Schema({
		name: String
	});

	var Kitten = mongoose.model('Kitten', kittySchema);

	var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name); // 'Silence'

	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	kittySchema.methods.speak = function speak () {
	  var greeting = this.name
	    ? "Meow name is " + this.name
	    : "I don't have a name";
	  console.log(greeting);
	};

	var Kitten = mongoose.model('Kitten', kittySchema);

	var fluffy = new Kitten({ name: 'fluffy' });
	console.log(fluffy.name);
	//fluffy.speak(); // "Meow name is fluffy"

	fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  //fluffy.speak();
	});

	Kitten.find(function (err, kittens) {
	  if (err) return console.error(err);
	  console.log(kittens);
	})

	Kitten.find({ name: /^Fluff/ }, callback);

	// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
	// kittySchema.methods.speak = function () {
	//   var greeting = this.name
	//     ? "Meow name is " + this.name
	//     : "I don't have a name";
	//   console.log(greeting);
	// }

});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app