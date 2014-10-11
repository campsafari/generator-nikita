'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var BackboneViewGenerator = module.exports = function BackboneViewGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BackboneViewGenerator, yeoman.generators.NamedBase);

BackboneViewGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

    console.log(
        ('\n') + chalk.bgGreen('Generate your Backbone View') +('\n')
    );

	var prompts = [{
		name: 'initName',
		message: 'Name:'
	}, {
		name: 'path',
		message: 'Destination: root -> app/sources/js/'
	}, {
		type: 'confirm',
		name: 'temp',
		message: 'Create a template for the View?',
		default: true
	}];

	this.prompt(prompts, function(props) {
		this.initName = props.initName;
		this.path = props.path;
		this.temp = props.temp;
		if (this.path !== '' ) {
			this.path = this.path.replace(/\/?$/, '/');
		}
		cb();
	}.bind(this));
};

BackboneViewGenerator.prototype.placeView = function placeView() {
	this.template('_View.js', 'app/source/js/' + this.path + this.initName + 'View.js');
};

BackboneViewGenerator.prototype.placeTemplate = function placeTemplate() {
	if (this.temp) {
		this.template('_Template.ejs', 'app/source/js/' + this.path + this.initName + '.ejs');
	}
};
