// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongojs		   = require('mongojs');

// configuration ===========================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

var conn    = mongoose.connection;

// app.get(db, function (req, res) {
//   console.log('I received a GET request');

//   db.users.find(function (err, docs) {
//     console.log(docs);
//     res.json(docs);
//   });
// });

// //SET MONGOOSE UP
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) {
	var ProductSchema = mongoose.Schema({
		id: Number,
		name: String,
		qty: Number,
		weight: String
	});

	var Product = mongoose.model('Product', ProductSchema);

	//INSERT DATA INTO DATABASE
	var beer = new Product({ 
		id: 1,
		name: 'Brahma',
		qty: 333,
		weight: '330ml'
	});
	console.log(beer.id);
	console.log(beer.name);
	console.log(beer.qty);
	console.log(beer.weight)

	beer.save(function (err, beer) {
	  if (err) return console.error(err);
	});

	// RETRIEVE DATA FROM DATABASE
    var booze = mongoose.model("Product");

    booze.find({}, function(err, data){
        console.log(">>>> " + data );
    });
});


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app, conn); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app