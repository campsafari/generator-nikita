'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
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
        'A Generator for Scaffolding Webapps with ' +
        'Foundation, Nikita, Backbone, Compass and Assemble.IO'
      ));
    }

    var prompts = [
      {
        type: 'checkbox',
        name: 'features',
        message: 'So whatcha whatcha whatcha want?',
        choices: [{
          name: 'Foundation',
          value: 'foundation'
        },
        {
          name: 'Nikita CSS',
          value: 'nikitacss'
        },
        {
          name: 'Backbone',
          value: 'backbone'
        },
        {
          name: 'RequireJS',
          value: 'requirejs'
        }]
    }];

    this.prompt(prompts, function (options){
      for (var key in options)
      {
        if (options.hasOwnProperty(key))
        {
          this.config.set(key, options[key]);
        }
      }

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
        "jsb": "~2.x.x"
      }
    };

    if (this.config.get('features').indexOf('foundation') >= 0)
    {
      bower.dependencies["foundation"] = "5.4.5";
    }

    if (this.config.get('features').indexOf('nikitacss') >= 0)
    {
      bower.dependencies["nikita.css"] = "0.x.x";
    }

    if (this.config.get('features').indexOf('backbone') >= 0)
    {
      bower.dependencies["backbone"] = "1.x.x";
    }

    if (this.config.get('features').indexOf('requirejs') >= 0)
    {
      bower.dependencies["requirejs"] = "2.1.8";
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
    this.mkdir('app');
    this.mkdir('app/source');
    this.directory('app/source/assemble/data', 'app/source/assemble/data');
    this.directory('app/source/assemble/helpers', 'app/source/assemble/helpers');
    this.directory('app/source/assemble/partials', 'app/source/assemble/partials');
    this.directory('app/source/assemble/partials', 'app/source/assemble/partials');
   
    this.mkdir('app/source/assemble/pages');
    this.template('app/source/assemble/pages/index.hbs');
    this.template('app/source/assemble/pages/forms.hbs');
    this.template('app/source/assemble/pages/rwd-testing.hbs');
    this.template('app/source/assemble/pages/example-layout-default.hbs');
    this.template('app/source/assemble/pages/example-layout-fullpage.hbs');
    
    this.mkdir('app/source/assemble/layouts');
    this.template('app/source/assemble/layouts/lyt-default.hbs');

    this.directory('app/source/sass/', 'app/source/sass/');
    this.template('app/source/sass/styles.scss', 'app/source/sass/styles.scss');

    this.mkdir('app/source/ajax');
    this.mkdir('app/source/img');
    this.mkdir('app/source/js');

    if (this.config.get('features').indexOf('requirejs') >= 0)
    {
      this.template('app/source/js/main.js', 'app/source/js/main.js');
    }

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
