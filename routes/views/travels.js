var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Travels';

	locals.filters = {
		destination: req.params.category,
	};

	locals.data = {
		travels: [],
		destinations: [],
	};

	// Load all categories
	view.on('init', function (next) {
		keystone.list('Travel').model.find().sort('name').exec(function (err, results) {
			console.log(results);
			locals.data.travels = results;
			next()
		});
	});

	// Load the current category filter
	// view.on('init', function (next) {

	// });

	// Render the view
	view.render('travels');
};
