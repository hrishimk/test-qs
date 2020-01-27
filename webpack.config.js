const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env', '@babel/preset-typescript']
    }
};

const htmlLoader = {
    test: /\.html$/,
    use: [{
        loader: 'html-loader',
        options: {
            // minimize: true,
            removeComments: true,
            // collapseWhitespace: true,
            interpolate: true,
        }
    }],
};

const styleLoader = {
    test: /\.(scss|sass)$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
};

const svgLoader = {
    test: /\.svg/,
    use: {
        loader: 'svg-url-loader',
        options: {}
    }
};

const fileLoader = {
    test: /\.(ttf|jpe?g|gif)$/i,
    use: [{
        loader: 'file-loader',
    }, ],
};

module.exports = {
    entry: './example/src/index.js',
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: babelLoader
            },
            htmlLoader,
            styleLoader,
            svgLoader,
            fileLoader
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'example/src/index.html'),
            filename: './index.html',
            inject: 'head',
        }),
        new HtmlWebpackInlineSVGPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'example'),
    },
};