var Entrevistas = require('../schema/entrevistas');


exports.index = function(req, res){
	Entrevistas.find(null, null, { sort: { 'longitude': 1, 'latitude': 1} },function (err, entrevistas) {
		if(err){
			console.log(err);
			return;
		}
		res.render('entrevistas', { title: 'Entrevistas', entrevistas :  entrevistas});
	});
};