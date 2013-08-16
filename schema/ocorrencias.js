var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crimes');

var Schema = mongoose.Schema;

var OcorrenciasSchema = new Schema(
	{
		hora : String,
		bairro : String,
		ano : Number,
		logradouro : String,
		num_boletim : Number,
		mes : String,
		nome_dia : String,
		//data : Date,
		num_logradouro : Number,
		setor : Number,
		id_tipo_ocorrencia : Number
	}
);


module.exports = mongoose.model('ocorrencias', OcorrenciasSchema);