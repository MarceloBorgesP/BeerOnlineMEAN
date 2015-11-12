angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/inventory', {
			templateUrl: 'views/inventory.html',
			controller: 'MainController'
		})

		.when('/clients', {
			templateUrl: 'views/clients.html',
			controller: 'NerdController'
		})

		.when('/history', {
			templateUrl: 'views/history.html',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);