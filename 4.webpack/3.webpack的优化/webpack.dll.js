//dll文件打包一次就好了，之后就可以不用重复打包

const { resolve } = require('path')
const webpack = require('webpack')

//运行webpack时，默认查找webpack.config.js配置文件，当需要运行webpack.dll.js文件时
// 指令：webpack --config webapck.dll.js
module.exports = {
    entry: {
        //生成打包的名字:['要打包的库名']
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]' //打包的库向外暴露出去的内容加什么名字
    },
    plugins: [
        //打包生成一个manifest.json文件  ---》 提供jquery的映射关系
        new webpack.DllPlugin({
            name: '[name]_[hash]',       //对应library暴露的名字
            path: resolve(__dirname, 'dll/manifest.json')  //输出文件路径
        })
    ],
    mode: 'production'
}