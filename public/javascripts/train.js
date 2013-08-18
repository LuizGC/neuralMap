(function(){

	var Train = angular.module('Train',['ngResource']);



	Train.controller('train', ['$scope', '$resource', function($scope, $resource) {
		var resource = $resource('/train', {}, {
			treinar:{method:'POST', params:{configuracao:'@configuracao'}}
		});

		$scope.learningRate="";
		$scope.momentum="";
		$scope.errorThresh="";
		$scope.iterations="";
		$scope.camada = {quantidadeNeuronios:""};
		$scope.camadas = [];

		$scope.adicionarNeuronioCamadaEscondida = function(){
			$scope.camadas.push($scope.camada.quantidadeNeuronios);
			$scope.camada.quantidadeNeuronios = "";
		};

		$scope.removerCamadaEscondida = function(camada){
			var index = $scope.camadas.indexOf(camada);
			$scope.camadas.splice(index, 1);

		};

		$scope.voltarConfiguracaoTreinamento = function(){
			window.location.href= "train";
		};

		$scope.treinar = function(){
			var configuracao = {};
			configuracao.learningRate = $scope.learningRate;
			configuracao.momentum = $scope.momentum;
			configuracao.errorThresh = $scope.errorThresh;
			configuracao.iterations = $scope.iterations;
			configuracao.camadas = $scope.camadas;
			resource.treinar(configuracao, function(res){
				if(res.status === "ok")
					window.location.href= "result";

			});
		};
	}])


})();
