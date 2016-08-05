const autoprefixer      = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path              = require('path');
const webpack           = require('webpack');

const config = {

  debug: true,
  context: __dirname, // This option allows to write relative paths in the "entry" prop. Note: Doesn't affect "output"
  entry: {
    //indexIndex: './frontend/views/index/index.js',
    main: ['./src/javascripts/main'] // array type required to add files through gulp webpack-dev-task
  },
  output: {
    path: path.join(__dirname, './'),
    filename: 'public/js/[name].js', // Template [name] based naming to make in expandable with future multiple entrypoints option
    //publicPath: '/build'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|libs|vendor/,
        loaders: ['babel-loader']
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules|libs|vendor/,        
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass?outputStyle=compressed'
        )
      },
      { 
        test: /\.handlebars$/, 
        loader: "handlebars-loader"
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("public/css/[name].css"),
    /*new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })*/
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.scss', '.css', 'handlebars'],
  },

  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
}

module.exports = config;
