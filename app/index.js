'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // setup the test-framework property, Gruntfile template will need this
    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    this.testFramework = this.options['test-framework'];

    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(require('yosay')());
      this.log(chalk.magenta(
        'Out of the box I include HTML5 Boilerplate, jQuery, and a ' +
        'Gruntfile.js to build your app.'
      ));
    }

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Foundation',
        value: 'includeFoundation',
        checked: true
      },{
        name: 'Nikita CSS',
        value: 'includeNikitaCss',
        checked: false
      },{
        name: 'Backbone',
        value: 'includeBackbone',
        checked: false
      }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      this.includeFoundation = hasFeature('includeFoundation');
      this.includeNikitaCss = hasFeature('includeNikitaCss');
      this.includeBackbone = hasFeature('includeBackbone');

      done();

    }.bind(this));

  },

  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function () {
    
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {
        "requirejs": "~2.1.8",
        "jsb": "~2.x.x"
      }
    };

    if (this.includeFoundation)
    {
      bower.dependencies["foundation"] = "5.x.x";
    }

    if (this.includeNikitaCss)
    {
      bower.dependencies["nikita.css"] = "0.x.x";
    }

    if (this.includeBackbone)
    {
      bower.dependencies["backbone"] = "1.x.x";
    }

    this.copy('bowerrc', '.bowerrc');
    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  jshint: function () {
    this.copy('jshintrc', '.jshintrc');
  },

  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  mainStylesheet: function () {
    var css = 'app/source/sass/styles.scss';
    this.template(css);
  },

  writeIndex: function () {
    this.indexFile = this.engine(
      this.readFileAsString(join(this.sourceRoot(), 'index.html')),
      this
    );

    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'sources/main.js',
      sourceFileList: ['sources/js/main.js'],
      searchPath: ['app', '.tmp']
    });
  },

  app: function () {
    this.directory('app');
    this.directory('app/source/sass/', 'app/source/sass/');
    this.mkdir('app/source/ajax');
    this.mkdir('app/source/asset');
    this.mkdir('app/source/img');
    this.mkdir('app/source/js');
    this.template('app/source/js/main.js', 'app/source/js/main.js');
    this.template('app/source/sass/styles.scss', 'app/source/sass/styles.scss');

  },

  install: function () {
    this.on('end', function () {
      this.invoke(this.options['test-framework'], {
        options: {
          'skip-message': this.options['skip-install-message'],
          'skip-install': this.options['skip-install']
        }
      });

      if (!this.options['skip-install']) {
        this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install']
        });
      }
    });
  }
});
