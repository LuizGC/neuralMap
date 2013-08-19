var brain = require("brain")
var Entrevistas = require('../schema/entrevistas');
var neural = {};

var normalizar = function(valor){
	  if(valor == 99)
	    return 6 * 0.166666667;
	return valor * 0.166666667;
}

var configuracao = function(body){
	var callbackPeriod = 200;
	if(body.iterations)
		if(body.iterations > 100)
			callbackPeriod = Math.round(body.iterations/100);
		else
			callbackPeriod = 1;


	return {
		hiddenLayers: body.camadas,
		learningRate: body.learningRate,
		momentum: body.momentum || 0.1,
		errorThresh: body.errorThresh || 0.005,
		iterations: body.iterations || 20000,
		callback: function(error){neural.error.push(error)},
		callbackPeriod : callbackPeriod,
		entrada: body.entrada,
		saida: body.saida,
		log: true,
		unknownData:body.unknownData

	};
};

var treinar = function(data, checkUnknownData,options){
	neural.net = new brain.NeuralNetwork(options);
	neural.error = [];//os erros são adicionandos na funcao  configuracao
	neural.trainingOutput = neural.net.train(data, options);
	neural.configuracao = {};
	neural.configuracao.errorThresh = options.errorThresh;
	neural.configuracao.iterations = options.iterations;
	neural.entrada = options.entrada;
	neural.saida = options.saida;
	neural.unknownDataError = 0;


	for(var index in checkUnknownData){
		var result = neural.net.run(checkUnknownData[index].input);
		for(var err in result){
			neural.unknownDataError += checkUnknownData[index].output[err] - result[err];
		}
	}
}


exports.configuracao = function(req, res){
	res.render('train', { title: 'Train'});
};

exports.treinar = function(req, res){
	Entrevistas.find(function (err, entrevistas) {
		if(err){
			res.json({status : "error"});
		}
		var entrada = req.body.entrada;
		var saida = req.body.saida;

		var dataTraining = [];
		var checkUnknownData = [];
		var unknownDataLimit = Math.round(entrevistas.length - entrevistas.length * req.body.unknownData/100);

		for(var index in entrevistas){
			var input = {};
			if(entrada.educacao) input.educacao = normalizar(entrevistas[index].educacao);
			if(entrada.escolaridade) input.escolaridade = normalizar(entrevistas[index].escolaridade);
			if(entrada.idade) input.idade = normalizar(entrevistas[index].idade);
			if(entrada.renda) input.renda = normalizar(entrevistas[index].renda);
			if(entrada.sexo) input.sexo = normalizar(entrevistas[index].sexo);
			if(entrada.saude) input.saude = normalizar(entrevistas[index].saude);
			if(entrada.seguranca) input.seguranca = normalizar(entrevistas[index].seguranca);

			var output = {};
			if(saida.educacao) output.educacao = normalizar(entrevistas[index].educacao);
			if(saida.escolaridade) output.escolaridade = normalizar(entrevistas[index].escolaridade);
			if(saida.idade) output.idade = normalizar(entrevistas[index].idade);
			if(saida.renda) output.renda = normalizar(entrevistas[index].renda);
			if(saida.sexo) output.sexo = normalizar(entrevistas[index].sexo);
			if(saida.saude) output.saude = normalizar(entrevistas[index].saude);
			if(saida.seguranca) output.seguranca = normalizar(entrevistas[index].seguranca);

			if(dataTraining.length < unknownDataLimit)
				dataTraining.push({input:input, output:output});
			else
				checkUnknownData.push({input:input, output:output});
		}


		treinar(dataTraining, checkUnknownData,configuracao(req.body));


		res.json({status : "ok"});
	});
};

exports.result = function(req, res){
	var result = {};


	result.net = neural.net;
	result.labels = [];
	result.datas = [];
	result.configuracao = neural.configuracao;
	result.trainingOutput = neural.trainingOutput;
	result.entrada = neural.entrada;
	result.saida = neural.saida;
	result.unknownDataError = neural.unknownDataError;

	for(var index in neural.error){
		var error = neural.error[index];
		result.labels.push(error.iterations);
		result.datas.push(error.error);
	}

	res.render('result', { title: 'Train', neural:result});
};

exports.index = function(req, res){
	res.render('index', { title: 'Home'});
};