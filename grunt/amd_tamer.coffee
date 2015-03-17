module.exports =
  options:
    base: 'tmp/amd/'
    namespace: '<%= package.name %>'
  scripts:
    src: ['tmp/amd/**/*.js'],
    dest: 'dist/amd/<%= package.name %>.js'