module.exports = (grunt) ->
  files: ['gruntfile.js', 'src/**/*.js'],
  options: grunt.file.readJSON '.jshintrc'