const path = require('path');
const webpack = require('webpack');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
// 1. 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    stats: {
        children: true
    },
    optimization: {
        moduleIds: 'named'
    },
    // ...
    // 2. 配置JS入口(多入口)
    entry: {
        index: './src/js/index.js',
        common: './src/js/common.js',
        likelist: './src/js/likelist.js',
        playlist: './src/js/playlist.js',
        radio: './src/js/radio.js',
        song: './src/js/song.js',
        songer: './src/js/songer.js',
        search: './src/js/search.js',
        // playlist1: './src/js/playlist1.js'
    },
    // 配置出口
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'inline-source-map',
    // 3. 配置插件
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        // 需要编译多少个HTML，就需要new几次插件
        new HtmlWebpackPlugin({
            template: './src/html/cloudmusic.html',
            filename: 'cloudmusic.html',
            chunk: ['common', 'index']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/likelist.html',
            filename: 'likelist.html',
            chunk: ['common', 'likelist']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/search.html',
            filename: 'search.html',
            chunk: ['common', 'sreach']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/songer.html',
            filename: 'songer.html',
            chunk: ['common', 'songer']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/song.html',
            filename: 'song.html',
            chunk: ['common', 'song']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/playlist.html',
            filename: 'playlist.html',
            chunk: ['common', 'playlist']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/radio.html',
            filename: 'radio.html',
            chunk: ['common', 'radio']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/playlist1.html',
            filename: 'playlist1.html',
            chunk: ['common', 'playlist1']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     test: /\.css$/i,
            //     use: [MiniCssExtractPlugin.loader, "css-loader"],
            // }, 
            {
                test: /\.PNG$/,
                // 使用一个loader
                // 下载url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 8 * 1024表示 图片大小小于8KB，就会被base64处理
                    // 优点: 减少请求数量(减轻服务器压力)
                    // 缺点: 图片体积会更大(文件请求熟读更慢)
                    limit: 8 * 1024,
                    // 问题:因为url-loader默认使用es6模块化解析,而html-loader引入图片是commonjs
                    // 解析时会出问题:[object Module]
                    // 解决:关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [text]取文件原来扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理Html中img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader',
            }, {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },

                exclude: '/node_modules/'
            },
            {
                test: /\.js$/i,
                loader: 'eslint-loader',
                exclude: /node_modules/, // 忽略第三方库
                options: {
                    fix: true // 自动修复 eslint的 错误
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // {
            //     // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
            //     test: /\.html$/,
            //     loader: "html-loader",
            //     options: {
            //         esModule: false,
            //     }
            // },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    // rules: {
    //     test: /\.js$/,
    //     loader: 'eslint-loader',
    //     enforce: "pre",
    //     include: [path.resolve(__dirname, 'src')], // 指定检查的目录
    //     options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
    //         formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    //     }
    // },

    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         use: [{
    //             loader: 'babel-loader',
    //             options: {
    //                 presets: ['es2015']
    //             }
    //         }],
    //         exclude: /node_modules/
    //     }]
    // },

    devServer: {
        static: {
            directory: path.join(__dirname, "/dist")
        },
        //配置开发服务运行时的文件根目录
        port: 5100, //端口
        hot: true, //是否启用热更新
        open: false, //是否自动打开浏览器
    },
    mode: "development"
}