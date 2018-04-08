/* Webpack helps by bundling up the javascript. */
var path = require('path');     /* This is part of node.js */

module.exports = {
    entry: {
        App: './app/assets/scripts/App.js',
        Vendor: './app/assets/scripts/Vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './app/temp/scripts'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}