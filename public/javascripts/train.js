(function(){

	var Train = angular.module('Train',[]);

	Train.controller('train', ['$scope', function($scope) {

		$scope.camada = {neuronio:""};
		$scope.camadas = [];

		$scope.adicionarNeuronioCamadaEscondida = function(){
			$scope.camadas.push($scope.camada.neuronio);
			$scope.camada.neuronio = "";
		};

		$scope.removerCamadaEscondida = function(camada){
			var index = $scope.camadas.indexOf(camada);
			$scope.camadas.splice(index, 1);

		};
	}])


})();
