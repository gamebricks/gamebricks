module.exports = (grunt) ->

  require('time-grunt')(grunt)

  require('load-grunt-config') grunt,
    jitGrunt: true

  grunt.registerTask 'default', ['clean', 'bowercopy', 'amd_tamer', 'test', 'uglify']
  
  grunt.registerTask 'test', ['jshint']
  
  grunt.registerTask 'doc', ['dependo']