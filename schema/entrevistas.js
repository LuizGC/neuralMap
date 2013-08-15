var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var EntrevistaSchema = new Schema({ sexo: Number,
	idade: Number,
	renda: Number,
	escolaridade: Number,
	lula: Number,
	aecio: Number,
	prefeito: Number,
	camara: Number,
	saude: Number,
	educacao: Number,
	seguranca: Number,
	endereco: String,
	latitude: Number,
	longitude: Number });


exports.Entrevista = mongoose.model('Entrevista', EntrevistaSchema);