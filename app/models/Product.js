// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Product', {
	id : {type: Number, default: ''},
	name : {type : String, default: ''},
	brand : {type : String, default: ''},
	qty : {type: Number, default: ''},
	weight : {type: String, default: ''}
});
