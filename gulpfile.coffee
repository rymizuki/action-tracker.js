gulp = require('gulp')

test_files = [
  'node_modules/sinon-browser-only/sinon.js'
  'node_modules/power-assert/build/power-assert.js'
  'dist/action-tracker.min.js'
  'test/**/*.js'
]

gulp.task 'build', ->
  webpack = require('webpack-stream')
  uglify  = require('gulp-uglify')
  rename  = require('gulp-rename')
  gulp.src('src')
    .pipe webpack(
      entry: 'action-tracker'
      output:
        filename: 'action-tracker.js'
      resolve:
        extensions: [
          '',
          '.js'
        ]
        modulesDirectories: [
          './src/',
          './node_modules/'
        ]
      module:
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?experimental&optional=runtime' }
        ]
      externals: [
      ]
    )
    .pipe gulp.dest('dist/')
    .pipe uglify()
    .pipe rename({suffix: '.min'})
    .pipe gulp.dest('dist/')
gulp.task 'test-browsers', (done) ->
  karma = require('gulp-karma')
  gulp.src(test_files)
    .pipe karma(
      configFile: __dirname + '/karma.conf.coffee'
      action: 'watch'
    )
gulp.task 'test', ->
  karma = require('gulp-karma')
  gulp.src(test_files)
    .pipe karma(
      configFile:__dirname + '/karma.conf.coffee'
      action: 'run'
      browsers: ['PhantomJS']
    )
gulp.task 'coverage', (done) ->
  istanbul = require('gulp-istanbul')
  karma    = require('gulp-karma')
  gulp.src(['dist/action-tracker.js'])
    .pipe istanbul({includeUntested: true})
    .on 'finish', () ->
      gulp.src(test_files)
        .pipe karma(
          configFile: __dirname + '/karma.conf.coffee'
          action:     'run'
          browsers:   ['PhantomJS']
        )
        .pipe istanbul.writeReports()
gulp.task 'watch', ->
  gulp.watch('src/**/*.js', ['build'])
gulp.task 'default', ['watch', 'test-browsers']
