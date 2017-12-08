const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: './example/index.ts',
    output: {
      path: path.resolve("./", "dist"),
      filename: "jsonforms.js",
      library: "JSONForms",
      libraryTarget: 'umd',
      umdNamedDefine: true
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".ts", ".js", ".tsx"]
    },
    plugins: [
    ],
    module: {
      rules: [
        { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
        {
          test: /\.ts$/, 						  // All ts and tsx files will be process by
          loaders: ['ts-loader' ], // first ts-loader, then babel-loader
          exclude: /node_modules/                   // ignore node_modules
        },
        {
          test: /\.tsx$/, 						  // All ts and tsx files will be process by
          loaders: [ 'babel-loader', 'ts-loader' ], // first ts-loader, then babel-loader
          exclude: /node_modules/                   // ignore node_modules
        },
        {
          test: /\.jsx?$/,                          // all js and jsx files will be processed by
          loader: 'babel-loader',                   // babel-loader
          exclude: /node_modules/                  // ignore node_modules
        },
        { enforce: 'pre', test: /\.ts$/, exclude: /node_modules/, loader: 'tslint-loader',
          options: {
            configuration: require('../../../tslint.json'),
            failOnHint: false,
            typeCheck: true
          }
        }
      ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};