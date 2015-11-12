var app = angular.module('ClientCtrl').controller('ClientController', function($scope) {

});

app.controller('ClientController', ['$scope', '$http', function($scope, $http) {
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