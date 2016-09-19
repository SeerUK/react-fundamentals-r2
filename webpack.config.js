const path = require("path");
const webpack = require("webpack");

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

function buildConfiguration() {
    const config = {};

    config.cache = true;
    config.debug = true;
    config.devtool = "cheap-module-source-map";

    config.entry = {
        "vendor": "./src/vendor.jsx",
        "main": "./src/main.jsx"
    };

    config.output = {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js?[hash]",
        sourceMapFilename: "js/[name].map?[hash]",
        chunkFilename: "js/[id].chunk.js?[hash]"
    };

    config.devServer = {
        contentBase: "./src/web",
        historyApiFallback: true,
        port: 3333,
        quiet: true,
        stats: "minimal"
    };

    config.module = {
        loaders: [
            // HTML
            {
                test: /\.html$/,
                loader: "html",
                exclude: path.resolve(__dirname, "src", "web")
            },

            // JS / JSX
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: [ "es2015", "react" ]
                }
            }
        ]
    };

    config.plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: [ "main", "vendor" ]
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/web/index.html",
            chunksSortMode: "dependency"
        })
    ];

    config.resolve = {
        cache: true,
        extensions: [ "", ".js", ".jsx", ".css", ".html" ],
        root: [ path.join(__dirname, "src") ]
    };

    return config;
}

module.exports = buildConfiguration();
