var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
var Products= require('./models/db').Products;
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(bodyParser.urlencoded({extended: false}));
app.use(require('method-override')('_method'));

app.get('/', function(req, res, next){
	res.render('index',{section:'Welcome, Jason!', backUrl: '/'});
});

app.use('/products', require('./routes/products'));

app.use(function(err, req, res, next){
  console.log(err);
  res.sendStatus(500);

});



module.exports = app;
