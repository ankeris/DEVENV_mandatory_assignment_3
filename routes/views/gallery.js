var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'gallery';
	
	locals.images = [];

	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));

	view.on('init', function(next) {
		keystone.list('Travel').model.find().exec((err, result) => {
			result.map(travel => {
				locals.images.push(travel.image);
			});
			next(err);
		});


	});

	// Render the view
	view.render('gallery');

};
