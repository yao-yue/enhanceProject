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
#### 1. 提取css成单独文件
mini-css-extract-plugin 
在loader-----use配置中
MiniCssExtractPlugin.loader  替代  style-loader
```
new MiniCssExtractPlugin({ 
    // 对输出的 css 文件进行重命名 
    filename: 'css/built.css' 
})
```
#### 2. css兼容性处理
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

#### 3. 压缩CSS 
关键词：
1. optimize-css-assets-webpack-plugin

#### 4. js语法检查
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
}
```

#### 5. js兼容性处理 
关键词：  babel
1. babel-loader @babel/core @babel/preset-env @babel/polyfill core-js
2. 
```
presets: [ [ 
    '@babel/preset-env', 
    { 
    // 按需加载 
    useBuiltIns: 'usage', 
    // 指定 core-js 版本 
    corejs: { version: 3 }, 
    // 指定兼容性做到哪个版本浏览器 
    targets: { 
        chrome: '60',
        firefox: '60',
        ie: '9',
        safari: '10',
        edge: '17' } 
        } 
    ] 
]
```

#### 6. js压缩
生产模式下会自动压缩js代码

#### 7. html压缩
```
// 压缩 html 代码 template同级
minify: { 
    // 移除空格 
    collapseWhitespace: true,
    // 移除注释 
    removeComments: true 
} 
```
#### 8. 生产环境基本配置
一些需要注意的小细节：一般来说一个文件只让一个loader处理，有例外比如js文件，需要eslint检查及babel处理，这个时候就需要保证loader的处理顺序，先执行eslint再执行babel
配置  enforce: 'pre'


### webpack的优化
1. 开发环境优化
- 提高打包构建速度
- 优化代码调试
2. 生产环境优化
- 提高打包构建速度
- 提高代码性能

### 优化关键词
1. HMR，即hot module rewrite
devServer 里面 hot：true。
2. source-map   
几种source-map的配置及其特点  关键词cheap\eval还有外部和inline之分，是否隐藏源代码及报错的充分性
推荐用法： 开发环境eval-source-map、生产环境 source-map、
其作用，构建打包生成文件到源代码的映射。\t 
使用: devtool: 'source-map'
3. oneOf:[]其中的loader只会匹配一个文件、检查js的eslint-loader要放在外面优先执行
4. 缓存 开启babel缓存，options里面配置 cacheDirectory: true.
5. tree-shaking 开启生产模式
6. code-split
- 配置 
- 1. 可以将node_modules中模块单独打包成一个chunk
- 2. 自动分析多入口chunk,可以将多入口中的公共文件单独打包成一个chunk,避免重复打包
```
optimization： {
    splitChunks: {
        chunks: 'all'
    }
}
```
对于他们的单入口和多入口还是有些笔记要写：之后再补充把。
7. lazyloading和presetloading懒加载和预加载
8. pwa 渐进式网络开发应用程序
- 效果：网页在离线状态时还能进行一定的访问和浏览，不是直接404,淘宝网采用了这个
- 关键词： workbox-webpack-plugin
- 配置： 
```
new WorkboxWebpackPlugin.GenerateSW({ 
/* 1. 帮助 serviceworker 快速启动 
   2. 删除旧的 serviceworker 生成一个 serviceworker 配置文件~
*/ 
    clientsClaim: true,
    skipWaiting: true 
})

```

9. 多进程打包
- 关键词： thread-loader
- 配置： options: { workers: 2 }

10. externals
避免一些不想要打包的文件被打包进来

11. DLL技术
add-asset-html-webpack-plugin
- 1. 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变 mainfest
- 2. 将某个文件打包输出去，并在 html 中自动引入该资源  filepath


### webpack5的一些新特点了解
