// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongojs		   = require('mongojs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// configuration ===========================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

var conn    = mongoose.connection;

/////////////////////   RESTFUL APIS TUTORIAL

// server.js

// BASE SETUP
// =============================================================================

var Product     = require('./app/models/Product');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /products
// ----------------------------------------------------


    // create a product (accessed at POST http://localhost:8080/api/product)
router.route('/products').post(function(req, res) {
        
        var product = new Product();      // create a new instance of the Product model
        product.name = req.body.name;  // set the products name (comes from the request)

        // save the product and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product created!' });
        });
        
    });

    // get all the products (accessed at GET http://localhost:8080/api/products)
router.route('/products').get(function(req, res) {
        Product.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });

// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/products/:product_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/products/:product_id)
    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    });

router.route('/products/:product_id')

    // update the product with this id (accessed at PUT http://localhost:8080/api/products/:product_id)
    .put(function(req, res) {

        // use our product model to find the product we want
        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);

            product.name = req.body.name;  // update the products info

            // save the product
            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product updated!' });
            });

        });
    });

router.route('/products/:product_id')

    // delete the product with this id (accessed at DELETE http://localhost:8080/api/products/:product_id)
    .delete(function(req, res) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// //test
// // var Beer = require('/app/models/Beer');

// // // Initial dummy route for testing
// // // http://localhost:3000/api
// // router.get('/', function(req, res) {
// //   res.json({ message: 'You are running dangerously low on beer!' });
// // });

// // -- New Code Below Here -- //

// // Create a new route with the prefix /beers
// // var beersRoute = router.route('/beers');

// // // Create endpoint /api/beers for POSTS
// // beersRoute.post(function(req, res) {
// //   // Create a new instance of the Beer model
// //   var beer = new Beer();

// //   // Set the beer properties that came from the POST data
// //   beer.name = req.body.name;
// //   beer.type = req.body.type;
// //   beer.quantity = req.body.quantity;

// //   // Save the beer and check for errors
// //   beer.save(function(err) {
// //     if (err)
// //       res.send(err);

// //     res.json({ message: 'Beer added to the locker!', data: beer });
// //   });
// // });




// ////////////////////////////////////////////////////////////////////

// // // //SET MONGOOSE UP
// // conn.on('error', console.error.bind(console, 'connection error:'));
// // conn.once('open', function (callback) {
// // 	var ProductSchema = mongoose.Schema({
// // 		id: Number,
// // 		name: String,
// // 		qty: Number,
// // 		weight: String
// // 	});

// // 	var Product = mongoose.model('Product', ProductSchema);

// ///////////////////////////////////////////////////////////////////////

// // 	//INSERT DATA INTO DATABASE
// // 	var beer = new Product({ 
// // 		id: 1,
// // 		name: 'Brahma',
// // 		qty: 333,
// // 		weight: '330ml'
// // 	});
// // 	console.log(beer.id);
// // 	console.log(beer.name);
// // 	console.log(beer.qty);
// // 	console.log(beer.weight)

// // 	beer.save(function (err, beer) {
// // 	  if (err) return console.error(err);
// // 	});

// // 	// RETRIEVE DATA FROM DATABASE
// //     var booze = mongoose.model("Product");

// //     booze.find({}, function(err, data){
// //         console.log(">>>> " + data );
// //     });
// // });


// // get all data/stuff of the body (POST) parameters
// app.use(bodyParser.json()); // parse application/json 
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
// app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// // routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app