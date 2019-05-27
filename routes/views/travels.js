var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Our freshly cooked travel';

	locals.filters = {
		destination: req.params.continent,
	};

	locals.travelsArr = [];
	locals.destinations = [];

	// Load destinations
	view.on('init', function (next) {
		keystone.list('TravelContinents').model.find().exec((err, result) => {
			if(err || !result.length){
				return next(err);
			}
			locals.data.destinations = result;
			next(err);
		})
	});

	view.on('init', function (next) {
		if(req.params.continent){
			keystone.list('TravelContinents').model.findOne({ key: locals.filters.destination }).exec((err, result) => {
				locals.data.destination = result;
				next(err);
			});
		}else{
			next();
		}
	});

	// Load all travels
	view.on('init', function (next) {
		var q = keystone.list('Travel').model.find().sort('name').populate('continents')
		
		if(locals.data.destination){
			q.where('continents').in([locals.data.destination]);
		}
		
		q.exec(function (err, results) {
			locals.data.travels = results;
			next();
		});
	});

	// Render the view
	view.render('travels');
};
