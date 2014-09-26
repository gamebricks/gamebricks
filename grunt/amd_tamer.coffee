module.exports =
  options:
    base: 'src/'
    namespace: '<%= package.name %>'
  scripts:
    src: ['src/**/*.js'],
    dest: 'dist/<%= package.name %>.js'