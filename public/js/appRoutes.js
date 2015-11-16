var app = angular.module('appRoutes', ['ngResource']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/inventory', {
			templateUrl: 'views/inventory.html',
			controller: 'InventoryController'
		})

		.when('/inventory/products/:id*', {
			templateUrl: 'views/update-product.html',
			controller: 'UpdateInventoryController'
			// resolve: {id: function() { return 1; }}
		})

		.when('/clients', {
			templateUrl: 'views/clients.html',
			controller: 'ClientController'
		})

		.when('/history', {
			templateUrl: 'views/history.html',
			controller: 'HistoryController'	
		});

	$locationProvider.html5Mode(true);

}]);