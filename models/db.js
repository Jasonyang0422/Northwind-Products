var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Products')
		.then(function(){
			console.log('Connect database successfully!');
		});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var productsSchema = new mongoose.Schema({
	name:        {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String
	},
	amount:      {
		type: Number,
		default: 1	
	},
	active:      {
		type: Boolean,
		default: true
	},
	urlTitle:    {
		type: String,
		required: true
	}	
});

productsSchema.pre('validate', function(next){
	this.urlTitle = this.name.replace(/\s/g, '_').replace(/\W/g, '');
	next();
});

var Products = mongoose.model('Products', productsSchema);

//model name should be singular
module.exports = {
	Products: Products
};















