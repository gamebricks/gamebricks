var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    amd_tamer: {
      options: {
        base: 'src/',
        namespace: 'gameboard'
      },
      scripts: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        report: 'gzip'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= amd_tamer.scripts.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js'],
      options: grunt.file.readJSON('.jshintrc')
    },
    clean: ['dist'],
    dependo: {
      targetPath: 'dist',
      outputPath: './doc/dependencies',
      format: 'amd'
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('./tasks');

  grunt.registerTask('test', 'Lints and unit tests', ['jshint']);
  grunt.registerTask('doc', 'Generated documentation', ['dependo']);
  grunt.registerTask('default', 'Default task', ['clean', 'amd_tamer', 'test', 'uglify']);

};
