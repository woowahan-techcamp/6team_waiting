const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            }
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./images/**", to: "./public"}
        ])
    ],
    node: {
        fs: "empty"
    }
};
