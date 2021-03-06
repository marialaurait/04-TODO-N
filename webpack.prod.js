const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const CopyPlugin              = require('copy-webpack-plugin'); 
const MinifyPlugin            = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const path                    = require('path');  //agregado
 
module.exports = {
 
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin()]
    },
    // contenthash sirve para que cuando cree una version nueva se actualice en el
    // caché del usuario
    output: {
        path: path.resolve(__dirname, 'dist'),  //agregado
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                  {loader: 'babel-loader',
                    // options: {
                    //   presets: ['@babel/preset-env']
                    // }
                  }
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: ['style-loader',
                     'css-loader']
            },
            {
                test: /styles\.css$/,
                use: [MiniCssExtractPlugin.loader,
                     'css-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // attributes: false,
                    sources: false,
                    // minimize: true
                }
            },
            {
                test: /\.(png|svg|jpeg|jpg|gif)$/,
                use: [
                {    loader: 'file-loader',
                     options: {
                           esModule: false,
                              }             
                }
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',   // para produccion
            // filename: '[name].css',
            ignoreOrder: false
        }),
        // versione vecchia
        // new CopyPlugin([
        //     { from: 'src/assets', to: 'assets/' },
        // ]),
        new CopyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' },
               ],
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]
 
    
}