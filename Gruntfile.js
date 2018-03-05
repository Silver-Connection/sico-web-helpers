"use strict";
var path = require('path');

// # Globbing
// for performance reasons we"re only matching one level down:
// "test/spec/{,*/}*.js"
// If you want to recursively match all subfolders, use:
// "test/spec/**/*.js"

module.exports = function (grunt) {
  // Main options
  var config = {
    paths: {
      source: "src",
      destination: "dist",
      typings: "types",
    },
  };

  // Time how long tasks take. Can help when optimizing build times
  require("time-grunt")(grunt);

  // Automatically load required grunt tasks
  require("jit-grunt")(grunt, {
    useminPrepare: "grunt-usemin"
  });

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    "config": config,

    // Clean up
    "clean": {
      builds: [
        "<%= config.paths.source %>/**/*.css",
        "<%= config.paths.source %>/**/*.js",
        "<%= config.paths.source %>/**/*.map",
        "<%= config.paths.source %>/**/*.d.ts",
        "<%= config.paths.destination %>/**",
        "<%= config.paths.typings %>/**",
      ],
      publish: [
        "<%= config.paths.destination %>/samples",
      ],
      watch: [
        "<%= config.paths.source %>/**/*.d.ts",
      ],
    },

    // Create dirs
    "mkdir": {
      typings: {
        options: {
          create: [
            "<%= config.paths.typings %>",
          ]
        },
      },
    },

    "copy": {
      publish: {
        files: [{
          expand: true,
          dot: false,
          cwd: "<%= config.paths.source %>",
          src: [
            "**/*.js",
            "**/*.css",
            "**/_*.scss",
            "**/*.map",
          ],
          dest: "<%= config.paths.destination %>",
        }]
      },
      types: {
        files: [{
          src: "<%= config.paths.source %>/datatables/sico.datatables.d.ts",
          dest: "<%= config.paths.destination %>/datatables/index.d.ts",
        },{
          src: "<%= config.paths.source %>/dropzone/sico.dropzone.d.ts",
          dest: "<%= config.paths.destination %>/dropzone/index.d.ts",
        },{
          src: "<%= config.paths.source %>/google/sico.google.maps.d.ts",
          dest: "<%= config.paths.destination %>/google/index.d.ts",
        },{
          src: "<%= config.paths.source %>/toggler/sico.toggler.d.ts",
          dest: "<%= config.paths.destination %>/toggler/index.d.ts",
        },{
          src: "<%= config.paths.source %>/transaction/sico.transaction.d.ts",
          dest: "<%= config.paths.destination %>/transaction/index.d.ts",
        },{
          src: "<%= config.paths.source %>/vue/sico.vue.d.ts",
          dest: "<%= config.paths.destination %>/vue/index.d.ts",
        },{
          src: "<%= config.paths.source %>/draw/sico.draw.gauge.d.ts",
          dest: "<%= config.paths.destination %>/draw/index.d.ts",
        },{
          expand: true,
          dot: false,
          cwd: "inject",
          src: [
            "vuejs/index.d.ts",
          ],
          dest: "<%= config.paths.destination %>",
        }]
      },
      inject: {
        files: [{
          expand: true,
          dot: false,
          cwd: "inject",
          src: [
            "*/index.d.ts",
          ],
          dest: "node_modules/@types",
        }]
      },
    },

    // Watch
    "watch": {
      css: {
        files: "<%= config.paths.source %>/**/*.scss",
        tasks: ["sass:build"]
      },
      ts: {
        files: ["<%= config.paths.source %>/**/*.ts", "!<%= config.paths.source %>/**/*.d.ts"],
        tasks: ["clean:watch", "ts:build"]
      }
    },

    // Compiles SASS to CSS
    "sass": {
      build: {
        files: [{
          expand: true,
          cwd: "<%= config.paths.source %>",
          src: [
            "**/*.{scss,sass}",
            "**/!_*.{scss,sass}"
          ],
          dest: "<%= config.paths.source %>/",
          ext: ".css"
        }]
      }
    },

    // Compile typescript
    "ts": {
      build: {
        tsconfig: true,
        src: ["<%= config.paths.source %>/**/*.ts"],
        dest: "<%= config.paths.source %>",
      }
    },

    // CSS
    "postcss": {
      options: {
        map: true,
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
          // require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/*/*.css',
      },
    },

    // index.d.ts
    "dtsGenerator": {
      options: {
        name: 'package-name',
        project: './',
        out: '<%= config.paths.typings %>/index.d.ts'
      },
      default: {
        src: ['src/vue/*.ts']
      }
    },

    // Build-in server
    "browserSync": {
      bsFiles: {
        src: [
          "./{,*/}*.html",
          "<%= config.paths.source %>/*/*.js",
          "<%= config.paths.source %>/*/*.css",
          "node_modules/**/*",
        ]
      },
      options: {
        server: {
          baseDir: "./"
        }
      }
    },

    "concurrent": {
      build: [
        "sass:build",
        "ts:build"
      ],
    }

  });

  grunt.registerTask("distclean", [
    "clean:builds",
  ]);

  // Inject
  grunt.registerTask("inject", [
    "copy:inject",
  ]);

  // Proccess files
  grunt.registerTask("build", [
    "clean:builds",
    "concurrent:build",
  ]);

  // Create typings
  grunt.registerTask("typings", [
    "mkdir:typings",
    "dtsGenerator",
  ]);

  // Publish
  grunt.registerTask("publish", [
    "clean:builds",
    "concurrent:build",
    "copy:publish",
    "copy:types",
    "postcss:dist",
    "clean:publish"
  ]);

  // Server
  grunt.registerTask("server", [
    "browserSync"
  ]);

};
