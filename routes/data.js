var Entrevista = require('../schema/entrevistas.js').Entrevista;


exports.index = function(req, res){
	Entrevista.find({}).sort({sexo: 1}).execFind(function (err, entrevistas) {
		if(err){
			console.log(err);
			return;
		}
		res.render('data', { title: 'Dados', entrevistas :  entrevistas});
	});
};