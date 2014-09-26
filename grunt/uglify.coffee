module.exports =
  options:
    banner: '/*! <%= package.name %> - v<%= package.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    report: 'gzip'
  dist:
    files:
      'dist/<%= package.name %>.min.js': ['<%= amd_tamer.scripts.dest %>']