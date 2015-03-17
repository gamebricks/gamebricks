module.exports = (grunt) ->
  files: ['gruntfile.js', 'src/**/*.js', 'src/bezier-easing.js'],
  options: grunt.file.readJSON '.jshintrc'