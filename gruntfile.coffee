module.exports = (grunt) ->

  require('time-grunt')(grunt)

  require('load-grunt-config') grunt,
    jitGrunt: true

  grunt.registerTask 'default', ['clean', 'babel', 'amd_tamer', 'test', 'uglify']
  
  grunt.registerTask 'test', ['jshint', 'karma']
  
  grunt.registerTask 'doc', ['dependo']
