var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  nodemon({
    script: 'app/server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
});
