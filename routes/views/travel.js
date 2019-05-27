var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Our fresh cooked travels';
	locals.filters = {
		category: req.params.category,
		travelSlug: req.params.travelSlug
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	// Load all categories
	view.on('init', function (next) {
        var q = keystone.list('Travel').model.findOne({
			slug: locals.filters.travelSlug
		});

		q.exec((err, result) => {
			locals.data.travel = result;
			next(err);
		})
	})

	// Render the view
	view.render('travel');
};
