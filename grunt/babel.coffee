module.exports =
  amd:
    options:
      modules: 'amd'
    files: [{
      expand: true,
      cwd: 'src',
      src: ['**/*.js', '!bezier-easing.js'],
      dest: 'tmp/amd'
    }]
  common:
    options:
      modules: 'common'
    files: [{
      expand: true,
      cwd: 'src',
      src: ['**/*.js', '!bezier-easing.js'],
      dest: 'dist/common'
    }]