(function(){

	var myAppData = angular.module('myAppData',[]);

	myAppData.controller('data', ['$scope', function($scope) {
		$scope.greeting = 'Hola!';
	}])


})();
