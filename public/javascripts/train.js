(function(){

	var Train = angular.module('Train',['ngResource']);


	var entradaSaida = function(){

		return {
			educacao : false,
			escolaridade : false,
			idade : false,
			renda : false,
			sexo : false,
			saude : false,
			seguranca : false
		} ;

	};

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
		$scope.entrada = entradaSaida();
		$scope.saida = entradaSaida();


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
			configuracao.entrada = $scope.entrada;
			configuracao.saida = $scope.saida;
			document.getElementById("progress").style.display="";
			var progress=0;
			var funProgress = setInterval(function(){
				progress++;
				if(progress < 90)
					document.getElementById("progressBar").style.width=progress+"%";
				else
					window.clearTimeout(funProgress);

			},10000);
			resource.treinar(configuracao, function(res){
				if(res.status === "ok")
					window.location.href= "result";
			});
		};
	}])


})();
