var brain = require("brain")
var neural = {};

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
		callbackPeriod : callbackPeriod

	};
};

var treinar = function(data, options){
	neural.net = new brain.NeuralNetwork(options);
	neural.error = [];
	neural.trainingOutput = neural.net.train(data, options);
	neural.configuracao = {};
	neural.configuracao.errorThresh = options.errorThresh;
	neural.configuracao.iterations = options.iterations;
}


exports.configuracao = function(req, res){
	res.render('train', { title: 'Train'});
};

exports.treinar = function(req, res){
	var data = [{input: [0, 0], output: [0]},
		{input: [0, 1], output: [1]},
		{input: [1, 0], output: [1]},
		{input: [1, 1], output: [0]}];

	treinar(data, configuracao(req.body));

	res.json({status : "ok"});
};

exports.result = function(req, res){
	var result = {};


	result.net = neural.net;
	result.labels = [];
	result.datas = [];
	result.configuracao = neural.configuracao;
	result.trainingOutput = neural.trainingOutput;

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