var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var EntrevistasSchema = new Schema(
	{
		aecio : Number,
		camara : Number,
		educacao : Number,
		endereco : String,
		escolaridade : Number,
		idade : Number,
		latitude : Number,
		longitude : Number,
		lula : Number,
		prefeito : Number,
		renda : Number,
		saude : Number,
		seguranca : Number,
		sexo : Number

	}
);


module.exports = mongoose.model('entrevistas', EntrevistasSchema);