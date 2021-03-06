const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const CopyPlugin = require('copy-webpack-plugin'); 
 
module.exports = {
 
    mode: 'development',
    // mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
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
            // filename: '[name].[contenthash].css',   // para produccion
            filename: '[name].css',
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
    ]
 
    
}