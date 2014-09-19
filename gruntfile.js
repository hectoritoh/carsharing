module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      dev: {
        dest: './www/lib',
        css_dest: './www/css',
        options: {
          packageSpecific: {
            'mudcube-eventjs': {files: ["js/Event.min.js"]},
            'require': {files: ["build/require.min.js"]},
            'zepto': {files: ["zepto.min.js"]},
            'skeleton': {files: ["stylesheets/skeleton.css","stylesheets/base.css","stylesheets/layout.css"]},
          },
          //ignorePackages: ['zeptojs']
        }
      }
    },



    connect: {
      server: {
        options: {
          port: 8000,
          hostname: 'localhost',
          livereload: true,
          base:'./www/',
          open: true,
        }
      }
    },



    watch: {
      js: {
        options: { livereload: true },
        files: ['./www/js/*.js', './www/lib/*.js'],
      },
      css: {
        options: { livereload: true },
        files: ['./www/css/*.css'],
      },
      html: {
        options: { livereload: true },
        files: ['./www/index.html'],
      },
      bower:{
        files: ['./bower_components/**/*.js'],
        tasks: ['bower']
      }
    },



    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower');

  // Default task(s).
  grunt.registerTask('default', ['connect','watch']);
  grunt.registerTask('reset', ['bower']);

};
