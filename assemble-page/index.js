'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var AssemblePageGenerator = module.exports = function AssemblePageGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(AssemblePageGenerator, yeoman.generators.NamedBase);

AssemblePageGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

    console.log(
        ('\n') + chalk.bgGreen('Generate your Assemble Page') +('\n')
    );

	var prompts = [{
		name: 'initName',
		message: 'Name of the Page?',
	},
	{
		name: 'initTitle',
		message: 'Page Title:',
	},
	{
		name: 'layout',
		message: 'Which template should be used?',
		default: 'lyt-default.hbs'
	}];

	this.prompt(prompts, function(props) {
		this.initName = props.initName;
		this.title = props.initTitle;
		this.layout = props.layout;
		//this.temp = props.temp;
		cb();
	}.bind(this));
};

AssemblePageGenerator.prototype.placeView = function placeView() {
	this.template('_page.hbs', 'app/source/assemble/pages/' + this.initName + '.hbs');
	this.write('app/source/assemble/data/' + this.initName + '.json ');
};

