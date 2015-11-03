module.exports = function(app, Kitten) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
		console.log('I received a GET request');

		// db_mongoose.on('error', console.error.bind(console, 'connection error:'));
		// db_mongoose.once('open', function (callback) {
			console.log("trying to get");
		  Kitten.find(function (err, docs) {
		    console.log(docs);
		    res.json(docs);
		  });
		// });

	});

};