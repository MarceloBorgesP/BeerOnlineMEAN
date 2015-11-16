angular.module('InventoryService', ['ngResource']).factory('Product', ['$http', function($http, $resource) {
	    console.log("Inside InventoryService");
	list: [],

	this.getProducts = function(callback) {
		$.ajax({
			type: 'GET',
			url: '/api/products',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	},

	this.remove = function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/products/' + id,
			success: function(response) {
				console.log('Guest deleted!');
				callback(true);
			},
			error: function(jqXHR) {
				console.log('Error to delete guest with id ' + id);
				callback(false);
			}
		});
	}
	return this;
}]);