var express = require('express');
var router = express.Router();
var Products = require('../models/db').Products;
module.exports = router;



router.get('/', function(req, res, next){
	Products.find({})
		.then(function(products){
			res.render('products', {products: products, section: 'All Products', backUrl: '/'});
		}, next);
});

router.get('/active', function(req, res, next){
	Products.find({ active: true })
		.then(function(products){
			res.render('products', {products: products, section: 'Active Products', backUrl: '/products'});
		}, next);
});	

router.get('/:name', function(req, res, next){
	var name = req.params.name;
	var allProducts;
	Products.find({})
		.then(function(products){
			allProducts = products;
			return Products.findOne({name: name});
		}).then(function(product){
			res.render('products', {products: allProducts, oneproduct: product, section: 'All Products', backUrl: '/products'});
		}, next);
});

router.post('/', function(req, res, next){
	Products.create(req.body)
		.then(function(){
			res.redirect('/products');
		}, next);
});

router.put('/:name/amount', function(req, res, next){
	var name = req.params.name;
	var amount = req.body.amount;
	Products.findOne({name: name})
		.then(function(product){
			product.amount = amount;
			return product.save();
		})
		.then(function(){
			res.redirect('/products');
		}, next);
});

router.put('/:name/active', function(req, res, next){
	var name = req.params.name;
	var val = req.body.active;
	Products.findOne({name: name})
		.then(function(product){
			product.active = val;
			return product.save();
		})
		.then(function(){
			res.redirect('/products');
		}, next);
});

router.delete('/:name', function(req, res, next){
	Products.remove(req.params)
		.then(function(){
			res.redirect('/products');
		}, next);
});
