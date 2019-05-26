var keystone = require('keystone');

/**
 * travelContinents Model
 * ==================
 */

var TravelContinents = new keystone.List('TravelContinents', {
	autokey: { from: 'name', path: 'key', unique: true },
});

TravelContinents.add({
	name: { type: String, required: true },
});

TravelContinents.relationship({ ref: 'Travel', path: 'travels', refPath: 'continents' });

TravelContinents.register();
