module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {
    path: './',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  devServer: {
    inline: true
  }
}
