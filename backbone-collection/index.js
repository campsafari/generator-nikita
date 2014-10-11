'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var BackboneCollectionGenerator = module.exports = function BCGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BackboneCollectionGenerator, yeoman.generators.NamedBase);

BackboneCollectionGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
        ('\n') + chalk.bgCyan('Generate a Backbone Collection') +('\n')
    );

	var prompts = [{
		name: 'initName',
		message: 'Name:',
		default: 'Collection'
	}, {
		name: 'path',
		message: 'Destination: root -> app/sources/js/',
		default: ''
	}];

	this.prompt(prompts, function (props) {
		this.initName = props.initName;
		this.collection = props.collection;
		this.path = props.path;
		if (this.path !== '') {
			this.path = this.path.replace(/\/?$/, '/');
		}

		cb();
	}.bind(this));
};


BackboneCollectionGenerator.prototype.placeCollection = function placeCollection() {
		this.template('_Collection.js', 'app/source/js/' + this.path + this.initName + 'Collection.js');
};
