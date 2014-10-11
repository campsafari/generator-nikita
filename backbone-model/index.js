'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var BMGenerator = module.exports = function BMGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BMGenerator, yeoman.generators.NamedBase);

BMGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
        ('\n') + chalk.bgMagenta('Generate your Backbone Model') +('\n')
    );

	var prompts = [{
		name: 'initName',
		message: 'Name:',
		default: 'Data'
	}, {
		name: 'path',
		message: 'Destination: root -> resources/js/models/',
		default: ''
	}, {
		type: 'confirm',
		name: 'collection',
		message: 'Would you like to initialize a Collection with your Model?',
		default: true
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

BMGenerator.prototype.placeModel = function placeModel() {
	this.template('_Model.js', 'app/source/js/' + this.path + this.initName + 'Model.js');
};

BMGenerator.prototype.placeCollection = function placeCollection() {
	if (this.collection) {
		this.template('_Collection.js', 'app/source/js/' + this.path + this.initName + 'Collection.js');
	}
};
