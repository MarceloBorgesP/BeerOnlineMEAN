angular.module('UpdateUpdateInventoryCtrl', []).controller('UpdateUpdateInventoryController', function($scope) {

});

angular.module('UpdateInventoryCtrl', []).controller('UpdateInventoryController', ['$scope', '$http', 'UpdateProduct', function($scope, $http, UpdateProduct) {
    console.log("Inside UpdateInventoryController");

    var init = function () {
		showProduct();
	};
	
	var showProduct = function () {
		//console.log("Showing Product");

		UpdateProduct.getProduct("563810eafb61a74d0b95c98c", function(product) {
			$scope.d = product;
			console.log($scope.d);
		});
	};
    init();
}]);