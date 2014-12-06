module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hapi');

  grunt.initConfig({
    watch: {
      hapi: {
        files: ['*.js','lib/*.js'],
        tasks: ['jshint','hapi'],
        options: {
          spawn: false
        }
      }
    },
    hapi: {
      custom_options: {
        options: {
          server: require('path').resolve('./lib/server'),
        }
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
    },
    jshint: {
      all: ['Gruntfile.js', 'seeds.js', 'lib/**/*.js', 'test/**/*.js']
    }
  });

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['jshint', 'hapi','watch']);

};