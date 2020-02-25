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
- devServer
用来自动化，自动编译，自动打开浏览器，自动刷新浏览器

### webpack的生产环境配置
1. 提取css成单独文件
2. css兼容性处理
3. 压缩CSS 
4. js语法检查
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
