angular.module('app', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/inventory', {
			templateUrl: 'views/inventory.html',
			controller: 'InventoryController'
		})

		.when('/clients', {
			templateUrl: 'views/clients.html',
			controller: 'ClientController'
		})

		.when('/history', {
			templateUrl: 'views/history.html',
			controller: 'historyController'	
		});

	$locationProvider.html5Mode(true);

}]);