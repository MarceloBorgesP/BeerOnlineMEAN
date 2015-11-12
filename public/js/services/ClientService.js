var app = angular.module('ClientService', []).factory('Client', ['$http', function($http) {

}]);

app.controller('ClientService', ['$scope', '$http', function($scope, $http) {
	var getList = function() {
	    console.log("Hello World from service");
	}
}]);