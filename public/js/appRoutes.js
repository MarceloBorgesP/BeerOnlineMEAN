var app = angular.module('app', ['ngResource'])

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/inventory', {
			templateUrl: 'views/inventory.html',
			controller: 'ProductController'
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