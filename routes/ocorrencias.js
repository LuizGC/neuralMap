var Ocorrencias = require('../schema/ocorrencias');


exports.index = function(req, res){
	Ocorrencias.find(function (err, ocorrencias) {
		if(err){
			console.log(err);
			return;
		}
		res.render('ocorrencias', { title: 'Ocorrencias', ocorrencias :  ocorrencias});
	});
};