app.controller('ClientController', ['$scope', '$http', 'Client', function($scope, $http, Client) {
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