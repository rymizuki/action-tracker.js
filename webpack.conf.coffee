module.exports =
  output:
    filename: 'action-tracker.js'
    libraryTarget: 'umd'
    library: 'ActionTracker'
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
