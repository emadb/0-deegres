module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'index.js'
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        timeout: 3000
     },
      src: [
        'test/*.js'
      ]
    }
  });

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['nodemon']);

};