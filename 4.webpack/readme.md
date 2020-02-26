主要参考尚硅谷最新webpack视频及掘金相关优秀文章。

### webpack是什么
webpack是一种前端资源构建工具，静态资源打包器
把资源文件作为模块处理，根据依赖关系进行静态打包生成对应的静态资源。

### webpack的五个核心概念及作用
1. entry 入口，webpack根据入口文件开始依赖分析
其对应的value可为 string、array、object类型，其效果chunk-bundles的1-1、n-1、n-n的对应关系，
有单入口、还有多入口，后面再详细分析。
2. output 输出。指示打包好的bundles输出到哪里，及一些命名
3. loader(module), 因为webpack只能处理js json文件，loader来处理css、img等文件
4. plugins 插件，能够使webpack的功能更加强大，做一些更广的事情
5. mode 定义开发环境及生产环境

### webpack基本认识
webpack自身能够打包js和json文件，并且能讲es6的模块化处理成浏览器能处理的语法。开启生产环境能压缩代码

### 知识点细分
- webpack的基本配置
- webpack的生产环境配置
- webpack的性能优化
- webpack5的一些新特点

### webpack的基本配置
1. 打包样式资源   
- 打包css
- 打包less
2. 打包html
- html-webpack-plugin  
功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS） 
- template: './src/index.html' 
复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
3. 打包图片资源
url-loader 
html-loader  处理html文件中的img图片（负责引入，再交给url-loader处理）
**这里有一个问题需要注意： html-loader引入图片是commonjs规则，而url-loader是Es6模块规则，需要关闭其ES6模块规则  在options里配置 esModule: false**
file-loader 
4. devServer
用来自动化，自动编译，自动打开浏览器，自动刷新浏览器
配置： compress\ contentBase \ port \ open
运行 npx webpack-dev-server
npx----npx 想要解决的主要问题，就是调用项目内部安装的模块,避免全局安装模块
npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。
5. 开发环境配置
在loader里面的options里面配置outputPath可以实现不同的资源分文件打包，打包更清晰
outputPath: 'imgs'  
outputPath: 'media'



### webpack的生产环境配置
1. 提取css成单独文件
mini-css-extract-plugin 
在loader-----use配置中
MiniCssExtractPlugin.loader  替代  style-loader
```
new MiniCssExtractPlugin({ 
    // 对输出的 css 文件进行重命名 
    filename: 'css/built.css' 
})
```
2. css兼容性处理
关键词： 
1. postcss-loader postcss-preset-env
2. 设置环境node环境变量  process.env.NODE_ENV = 'development'
3. use中加入
```
{
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
          //postcss的插件
          require('postcss-preset-env')()
      ] 
    }
}
```
4. 修改package.json加入兼容性相关信息
```
"browserslist": {
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
    ],
    "production": [
        ">0.2%",   //兼容市面上大多的浏览器
        "no dead", //不兼容已经死掉的浏览器
        "not op_mini all"  
    ]
}
```

3. 压缩CSS 
关键词：
1. optimize-css-assets-webpack-plugin

4. js语法检查
关键词： 
1. eslint eslint-loader
2. eslint-config-airbnb-base eslint-plugin-import
3. package.json 中配置
```
"eslintConfig": {
    "extends": "airbnb-base",
    "env": {
        "browser": true
    }
}
```
4. 记得在配置中exclude: /node_modules/
```options: {
    fix: true， //开始自动修复 
}```

5. js兼容性处理 
6. js压缩
7. html压缩
8. 生产环境基本配置

### webpack的优化
1. 开发环境优化
- 提高打包构建速度
- 优化代码调试
2. 生产环境优化
- 提高打包构建速度
- 提高代码性能

### webpack5的一些新特点了解
