angular.module('UpdateInventoryService', ['ngResource']).factory('UpdateProduct', ['$http', function($http, $resource) {
	console.log("Inside UpdateInventoryService");
	var product;

	this.getProduct = function(id, callback) {
		$.ajax({
			type: 'PATCH',
			url: '/api/products/' + id,
			dataType: 'json',
			success: function(product) {
				callback(product);
			}
		});
	}
	return this;
}]);
