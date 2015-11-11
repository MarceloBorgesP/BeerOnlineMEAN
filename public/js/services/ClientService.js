var sampleApp = angular.module('ClientService', []).factory('Client', ['$http', function($http) {

}]);

sampleApp.controller('ClientService', ['$scope', '$http', function($scope, $http) {
	var getList = function() {
	    console.log("Hello World from service");
	}
}]);