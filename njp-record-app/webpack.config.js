var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static/css' }
    ])
    // new CopyWebpackPlugin([
    //   // {output}/file.txt
    //   { from: 'from/file.txt' },
      
    //   // {output}/to/file.txt
    //   { from: 'from/file.txt', to: 'to/file.txt' },
      
    //   // {output}/to/directory/file.txt
    //   { from: 'from/file.txt', to: 'to/directory' },

    //   // Copy directory contents to {output}/
    //   { from: 'from/directory' },
      
    //   // Copy directory contents to {output}/to/directory/
    //   { from: 'from/directory', to: 'to/directory' },
      
    //   // Copy glob results to /absolute/path/
    //   { from: 'from/directory/**/*', to: '/absolute/path' },

    //   // Copy glob results (with dot files) to /absolute/path/
    //   {
    //     from: {
    //       glob:'from/directory/**/*',
    //       dot: true
    //     },
    //     to: '/absolute/path'
    //   },

    //   // Copy glob results, relative to context
    //   {
    //     context: 'from/directory',
    //     from: '**/*',
    //     to: '/absolute/path'
    //   },
      
    //   // {output}/file/without/extension
    //   {
    //     from: 'path/to/file.txt',
    //     to: 'file/without/extension',
    //     toType: 'file'
    //   },
      
    //   // {output}/directory/with/extension.ext/file.txt
    //   {
    //     from: 'path/to/file.txt',
    //     to: 'directory/with/extension.ext',
    //     toType: 'dir'
    //   }
    // ], {
    //   ignore: [
    //     // Doesn't copy any files with a txt extension    
    //     '*.txt',
        
    //     // Doesn't copy any file, even if they start with a dot
    //     '**/*',

    //     // Doesn't copy any file, except if they start with a dot
    //     { glob: '**/*', dot: false }
    //   ],

    //   // By default, we only copy modified files during
    //   // a watch or webpack-dev-server build. Setting this
    //   // to `true` copies all files.
    //   copyUnmodified: true
    // })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
