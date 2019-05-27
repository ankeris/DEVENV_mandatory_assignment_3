const keystone = require("../node_modules/keystone");
const Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

const Travel = new keystone.List("Travel", {
	map: { name: "title" },
	autokey: { path: "slug", from: "title", unique: true }
});

Travel.add({
	title: { type: String, required: true },
	state: {
		type: Types.Select,
		options: "draft, published, archived",
		default: "draft",
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: { state: "published" }
	},
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	continents: { type: Types.Relationship, ref: "TravelContinents", many: false }
});

Travel.schema.virtual("content.full").get(function() {
	return this.content.extended || this.content.brief;
});

Travel.defaultColumns = "title, state, publishedDate";
Travel.register();
