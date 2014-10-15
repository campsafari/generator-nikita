// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  //load assemble npm task
  grunt.loadNpmTasks('assemble');

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    assemble: 'app/source/assemble'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%%= config.app %>/source/js/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      scss: {
        files: ['<%%= config.app %>/source/sass/**/*.scss'],
        tasks: ['compass:server', 'autoprefixer'],
        options: {
          debounceDelay: 0,
          livereload: false
        }
      },
      assemble: {
        files: ['<%%= config.assemble %>/{data,layouts,pages,partials}/{,*/}*.{md,hbs,yml,json}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.app %>/{,*/}*.html',
          '<%%= config.tmp %>/styles/{,*/}*.css',
          '<%%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('<%%= config.tmp %>'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('<%%= config.tmp %>'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= config.tmp %>',
            '<%%= config.dist %>/*',
            '!<%%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= config.app %>/source/js/{,*/}*.js',
        '!<%%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },<% if (testFramework === 'mocha') { %>

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
        }
      }
    },<% } else if (testFramework === 'jasmine') { %>

    // Jasmine testing framework configuration options
    jasmine: {
      all: {
        options: {
          specs: 'test/spec/{,*/}*.js'
        }
      }
    },<% } %>

    assemble: {
      options: {
        data: '<%%= config.assemble %>/data/**/*.{json,yml}',
        helpers: '<%%= config.assemble %>/helpers/**/*.js',
        layoutdir: '<%%= config.assemble %>/layouts/',
        partials: '<%%= config.assemble %>/partials/**/*{hbs,svg}'
      },
      dev: {
        files: [{
          cwd: '<%%= config.assemble %>/pages/',
          dest: '<%%= config.tmp %>/',
          expand: true,
          flatten: true,
          src: ['**/*.hbs']
        }]
      }
    },
  
    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/source/sass',
          src: ['*.{scss,sass}'],
          dest: '<%%= config.tmp %>/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/source/sass',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

   // Configuration for managing SVG-icons
    grunticon: {
      options: {
        cssprefix: '%icon-',
        datapngcss: '_icons-data-png.scss',
        datasvgcss: '_icons-data-svg.scss',
        urlpngcss: '_icons-fallback.scss',
        tmpDir: '<%%= config.tmp %>/grunticon-tmp',
      },
      server: {
        options: {
          pngfolder: '../../../../.tmp/img/bgs/png-fallback',
          loadersnippet: '../../../../.tmp/grunticon/grunticon-loader.js', /* we don't need this! */
          previewhtml: '../../../../.tmp/grunticon/preview.html'  /* we don't need this! */
        },
        files: [
          {
            cwd: '<%%= config.tmp %>/svgmin/bgs',
            dest: '<%%= config.app %>/source/sass/grunticon',
            expand: true,
            src: ['*.svg']
          }
        ]
      },
      dist: {
        options: {
          pngfolder: '../../../dist/img/bgs/png-fallback',
          loadersnippet: '../../../../.tmp/grunticon/grunticon-loader.js', /* we don't need this! */
          previewhtml: '../../../../.tmp/grunticon/preview.html'  /* we don't need this! */
        },
        files: [
          {
            cwd: '<%%= config.tmp %>/svgmin/bgs',
            dest: '<%%= config.app %>/source/sass/grunticon',
            expand: true,
            src: ['*.svg']
          }
        ]
      }
    },
    
    requirejs: {
      compile: {
        options: {
          optimize: "none",
          findNestedDependencies: true,
          baseUrl: "<%%= config.app %>/source/js",
          mainConfigFile: "<%%= config.app %>/source/js/main.js",
          out: "<%%= config.tmp %>/source/js/main.js",
          name: "main"
        }
      }
    },


    jst: {
        options: {
            amd: true
        },
        compile: {
            files: {
                '<%%= config.tmp %>/source/js/templates.js': ['<%%= config.app %>/source/js/**/*.ejs']
            }
        }
    },

    // Configuration for compass
    compass: {
      options: {
        debugInfo: false,
        fontsDir: '<%%= config.app %>/source/fonts',
        force: true,
        imagesDir: '<%%= config.app %>/source/img',
        noLineComments: true,
        outputStyle: 'expanded', // minifying for dist will be done by grunt-contrib-cssmin
        raw: [
          'http_path = "/"',
          'Sass::Script::Number.precision = 8',
          'sass_options = {',
          '  :read_cache => true,',
          '}'
        ].join("\n"),
        require: ['sass-globbing', 'compass/import-once'],
        sassDir: '<%%= config.app %>/source/sass'
      },
      server: {
        options: {
          cssDir: '<%%= config.tmp %>/styles',
          environment: 'development',
          javascriptsDir: '<%%= config.tmp %>/js',
          sourcemap: true
        }
      },
      dist: {
        options: {
          cssDir: '<%%= config.dist %>/styles',
          environment: 'production',
          javascriptsDir: '<%%= config.dist %>/js',
          sourcemap: false
        }
      }
    },
    
    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.tmp %>/styles/',
          src: '{,*/}*.css',
          dest: '<%%= config.tmp %>/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^<%= config.app %>\/|\.\.\//,
        src: ['<%%= config.app %>/index.html'],
        exclude: []
      },
      sass: {
        src: ['<%%= config.app %>/source/sass/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%%= config.dist %>'
      },
      html: ['<%%= config.tmp %>/{,*/}*.html']
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%%= config.dist %>',
          '<%%= config.dist %>/images',
          '<%%= config.dist %>/styles'
        ]
      },
      html: ['<%%= config.dist %>/{,*/}*.html'],
      css: ['<%%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= config.dist %>/images'
        }]
      }
    },

    // Configuration for optimizing SVG-files
    svgmin: {
      options: {
         plugins: [
          { cleanupAttrs: true },
          { cleanupEnableBackground: true },
          { cleanupIDs: true },
          { cleanupNumericValues: true },
          { collapseGroups: true },
          { convertColors: true },
          { convertPathData: true },
          { convertShapeToPath: true },
          { convertStyleToAttrs: true },
          { convertTransform: true },
          { mergePaths: true },
          { moveElemsAttrsToGroup: true },
          { moveGroupAttrsToElems: true },
          { removeComments: true },
          { removeDoctype: true },
          { removeEditorsNSData: true },
          { removeEmptyAttrs: true },
          { removeEmptyContainers: true },
          { removeEmptyText: true },
          { removeHiddenElems: true },
          { removeMetadata: true },
          { removeNonInheritableGroupAttrs: true },
          { removeRasterImages: true },
          { removeTitle: true },
          { removeUnknownsAndDefaults: true },
          { removeUnusedNS: true },
          { removeUselessStrokeAndFill: false }, // Enabling this may cause small details to be removed
          { removeViewBox: false }, // Keep the viewBox because that's where illustrator hides the SVG dimensions
          { removeXMLProcInst: false }, // Enabling this breaks grunticon because it removes the XML header
          { sortAttrs: true },
          { transformsWithOnePath: false } // Enabling this breaks Illustrator SVGs with complex text
        ]
      },
      server: {
        files: [
          {
            cwd: '<%%= config.app %>/source/img/bgs',
            dest: '<%%= config.tmp %>/svgmin/bgs',
            expand: true,
            ext: '.svg',
            src: ['*.svg']
          },
          {
            cwd: '<%%= config.app %>/source/img/icons',
            dest: '<%%= config.tmp %>/svgmin/icons',
            expand: true,
            ext: '.svg',
            src: ['*.svg']
          }
        ]
      },
      dist: {
        files: [
          {
            cwd: '<%%= config.app %>/source/img/bgs',
            dest: '<%%= config.tmp %>/svgmin/bgs',
            expand: true,
            ext: '.svg',
            src: ['*.svg']
          },
          {
            cwd: '<%%= config.app %>/source/img/icons',
            dest: '<%%= config.tmp %>/svgmin/icons',
            expand: true,
            ext: '.svg',
            src: ['*.svg']
          }
        ]
      }
    },

    // Configuration for building the SVG-sprite
    svgstore: {
      options: {
        prefix : 'icon-',
        formatting : {
          indent_char: '  ',
          indent_size : 1
        },
        svg: {
          style: "display: none;"
        }
      },
      server: {
        files: {
          '<%%= config.tmp %>/icon-sprite.svg': ['<%%= config.tmp %>/svgmin/icons/*.svg']
        }
      },
      dist: {
        files: {
          '<%%= config.tmp %>/icon-sprite.svg': ['<%%= config.tmp %>/svgmin/icons/*.svg']
        }
      }
    },


  // Configuration for string-replacing the grunticon output
    'string-replace': {
      'grunticon-datasvg': {
        files: {
          '<%%= config.app %>/source/sass/icons/_icons-data-svg.scss': '<%%= config.app %>/source/sass/grunticon/_icons-data-svg.scss'
        },
        options: {
          replacements: [{
            pattern: /%icon-/g,
            replacement: '%icon-data-svg-'
          }]
        }
      },
      'grunticon-datapng': {
        files: {
          '<%%= config.app %>/source/sass/icons/_icons-data-png.scss': '<%%= config.app %>/source/sass/grunticon/_icons-data-png.scss'
        },
        options: {
          replacements: [{
            pattern: /%icon-/g,
            replacement: '%icon-data-png-'
          }]
        }
      },
      'grunticon-fallback': {
        files: {
          '<%%= config.app %>/source/sass/icons/_icons-fallback.scss': '<%%= config.app %>/source/sass/grunticon/_icons-fallback.scss'
        },
        options: {
          replacements: [{
            pattern: /%icon-/g,
            replacement: '%icon-fallback-'
          }]
        }
      }
    },


    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%%= config.dist %>/scripts/scripts.js': [
    //         '<%%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    //symlinks bower components to tmp for build task
    symlink: {
      // Enable overwrite to delete symlinks before recreating them
      options: {
        overwrite: false
      },
      // The "build/target.txt" symlink will be created and linked to
      // "source/target.txt". It should appear like this in a file listing:
      // build/target.txt -> ../source/target.txt
      explicit: {
        src: 'bower_components',
        dest: '<%= config.tmp %>/bower_components'
      },
    },


    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= config.app %>',
          dest: '<%%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%%= config.tmp %>',
          dest: '<%%= config.dist %>',
          src: [
            '{,*/}*.html'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%%= config.dist %>/.htaccess'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%%= config.app %>/source/sass',
        dest: '<%%= config.tmp %>/styles/',
        src: '{,*/}*.css'
      },
      js: {
        expand: true,
        dot: true,
        cwd: '<%%= config.app %>/source/js',
        dest: '<%%= config.tmp %>/source/js',
        src: '{,*/}*.js'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%%= config.dist %>/scripts/{,*/}*.js',
            '<%%= config.dist %>/styles/{,*/}*.css',
            '!<%%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'compass:server',
        'copy:styles',
        'copy:js'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'assemble',<% if(includeNikitaCss) { %>
      'svgmin:server',
      'svgstore:server',
      'grunticon:server',
      'string-replace:grunticon-datasvg',
      'string-replace:grunticon-datapng',
      'string-replace:grunticon-fallback',<% } %>
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',<% if (testFramework === 'mocha') { %>
      'mocha'<% } else if (testFramework === 'jasmine') { %>
      'jasmine'<% } %>
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'assemble',
    'wiredep',
    'symlink',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',<% if (includeRequire) { %>
    'requirejs',<% } %>
    'concat',
    'uglify',
    'copy:dist',
    'modernizr',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
