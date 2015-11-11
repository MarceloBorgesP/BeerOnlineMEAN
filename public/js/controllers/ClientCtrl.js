var app = angular.module('ClientCtrl'/*, ['ClientService', function (ClientService) ]*/).controller('ClientController', function($scope) {

});

app.controller('ClientController', ['$scope', '$http', 'ClientService', function($scope, $http, ClientService) {
    console.log("Hello World from controller");
    var init = function () {
		showList();
	};
	
	var showList = function () {
		console.log("Showing list");
		ClientService.getList(function() {
		});
	};
    init();
}]);