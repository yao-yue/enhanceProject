
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //详细loader配置
            {
                test: /\.css$/,
                use: [
                //use中执行顺序是从右到左
                'style-loader',
                //将CSS文件变成commonjs模块加载到js中，里面内容是样式字符串
                 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                //如果是单个就不需要用use:[],而是直接声明loader
                loader:  'url-loader',
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理
                loader: 'html-loader',
            },
            //其他资源的处理（除了html,css以外的)
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        //功能： 默认创建一个空的html，自动引入打包输出的所有资源
        //需要有结构的html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        //启动Gzip压缩
        compress: true,
        port: 3000,
        open: true,

    },
    mode: 'development'
}