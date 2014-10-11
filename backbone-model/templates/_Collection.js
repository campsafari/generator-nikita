define("<%= path %><%= initName %>", ["jquery", "backbone", "models/<%= path %><%= initName %>Model"], function($, Backbone, Model) {

		var <%= initName %>Collection = Backbone.Collection.extend({

			model: Model

		});

		return <%= initName %>Collection;

});