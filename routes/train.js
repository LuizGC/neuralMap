var brain = require("brain")
var neural = {};

var generateConfiguracao = function(body){
	var callbackPeriod = 200;
	if(body.iterations)
	  if(body.iterations > 100)
		  callbackPeriod = Math.round(body.iterations/100);
		else
		  callbackPeriod = 1;


	return {
		hiddenLayers: body.camadas,
		learningRate: body.learningRate,
		momentum: body.momentum,
		errorThresh: body.errorThresh,
		iterations: body.iterations,
		callback: function(error){neural.error.push(error)},
		callbackPeriod : callbackPeriod

	};
};


exports.configuracao = function(req, res){
	res.render('train', { title: 'Train'});
};

exports.treinar = function(req, res){
	var data = [{input: [0, 0], output: [0]},
		{input: [0, 1], output: [1]},
		{input: [1, 0], output: [1]},
		{input: [1, 1], output: [0]}];

	var options = generateConfiguracao(req.body);

	neural.net = new brain.NeuralNetwork(options);
	neural.error = [];

	neural.net.train(data, options);

	res.json({status : "ok"});
};

exports.result = function(req, res){
	var result = {};
	result.net = JSON.stringify(neural.net.toJSON());
	result.labels = [];
	result.datas = [];

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