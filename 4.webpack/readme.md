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
    webpack的基本配置  
    webpack的生产环境配置   
    webpack的性能优化  
    webpack5的一些新特点   

### webpack的基本配置
1. 打包样式资源   
    打包css
    打包less
2. 打包html
    html-webpack-plugin  
    功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS） 
    template: './src/index.html' 
    复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
3. 打包图片资源
    url-loader 
    html-loader  处理html文件中的img图片（负责引入，再交给url-loader处理）
**这里有一个问题需要注意： html-loader引入图片是commonjs规则，而url-loader是Es6模块规则，需要关闭其ES6模块规则  在options里配置 esModule: false**    
    file-loader 
4. devServer
    用来自动化，自动编译，自动打开浏览器，自动刷新浏览器
    只在内存中编译打包，不会有任何输出
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
    解释：为什么要把css打包成单独文件。
    因为css在js中会让js体积太大，并且css在js加载好才能加载，这就会产生三平现象
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
5. 在js中过滤一些检查 //eslint-disable-next-line

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
3. js兼容性处理的三种方案。
> 1. 基本js兼容性处理 @babel/preset-env 
    问题：只能转换基本语法，如promise等高级语法不能转换
> 2. 全部js兼容性处理 @babel/polyfill 体积有点太大了得不偿失，最好的还是按需兼容     
> 3. 需要做兼容性的再按需加载 core-js


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
提高打包构建速度   HMR
优化代码调试       source-map
2. 生产环境优化
提高打包构建速度
- oneOf
- babel缓存
- 多进程打包
- enternals
- dll（可以结合代码分割技术，可以实现更加细化的拆分方案）
提高代码性能
- 缓存(hash - chunkhash - contenthash)
- treeshaking
- code split 
- 懒加载/预加载
- pwa 离线访问技术



### 优化关键词
#### 1. HMR，即hot module rewrite
devServer 里面 hot：true。
#### 2. source-map   
    几种source-map的配置及其特点  
    关键词： cheap\eval还有外部和inline之分，是否隐藏源代码及报错的充分性
    > 补充一下： 内联和外部的区别，外部生成了文件，内联没有。内敛构建速度快一些
    > 比inline-source-map(内联)   hidden-source-map(外部) eval-source-map(内联)
    > eval-source-map(内联): 每一个文件都生成对应的source-map，都在eval
    > hidden-source-map: 现实错误代码原因，但是没有错误位置，不能追踪源代码错误，只能提示到构建后代码的错误位置
    > nosources-source-map: 错误代码准确信息，但是没有任何源代码信息
    > cheap 错误位置精确到行但不精确到列。比如一行有三个语句。module 会将loader的source mp家如

    推荐用法： 开发环境eval-source-map、生产环境 source-map。 开发环境速度快，调试更友好。开发环境：隐藏源代码，调试友好
    其作用，提供源代码到构建后代码的映射，主要是方便调试 
    使用: devtool: 'source-map'
    
#### 3. oneOf:[]其中的loader只会匹配一个文件、检查js的eslint-loader要放在外面优先执行
#### 4. 缓存 开启babel缓存，options里面配置 cacheDirectory: true.
    补充内容： 文件资源缓存
    hash: 每次webpack构建是会生成一个唯一的hash值。缺点：因为js和css同时使用一个hash值。如果重新打包，会导致所有的缓存失效。
    chunkhash： 根据chunk生成的hash值，如果打包来源与同一个chunk,那么hash值就一样。（由于css是在js中被引入的，所以同属于一个chunk.他们的hash还是一样。）
    contenthash： 根据文件内容生成的hash，让代码上线运行缓存更好使用
**补充内容** 对于某个文件a引用了文件b的hash导致重新加载的问题
    terser-webpack
```
optimization: {
    splitChunks: {
        chunks: 'all'
    },
    //将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    //解决： 修改a文件导致b文件的contenthash变化
    runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: {
        //ulgy不在维护，terser更好
        //配置生产环境下的压缩方案: js和css
        new TerserWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    }
}
```

#### 5. tree-shaking 开启生产模式 必须使用es6模块化。作用减少代码体积
    在package.json中配置：  
    "sideEffects":false 所有代码都没有副作用，都可以进行tree shaking.问题可能会把css/@babel/polyfill文件干掉
    "sideEffects":["*.css"] 不对css进行tree shaking

#### 6. code-split
配置 
1. 可以将node_modules中模块单独打包成一个chunk
2. 如果是多入口，自动分析多入口chunk,可以将多入口中的公共文件单独打包成一个chunk,避免重复打包
```
optimization： {   //optimization 最优
    splitChunks: {
        chunks: 'all'
    }
}
```
3. 通过js代码让某个文件单独打包成一个chunk
import(/*webpackChunkName: 'test'*/'./test').then(()=> {
    console.log('文件加载成功')
}).catch(()=> {
    console.log('文件加载失败')
})
4. import 动态导入语法：能将某个文件单独打包。/*webpackChunkName: 'test'*/备注加名字



#### 7. lazyloading和presetloading懒加载和预加载
    懒加载：在某个动作的回调函数中采用上面的import动态导入语法（利用代码分割，然后再单独懒加载）
    预加载： /*webpackChunkName: 'test', webpackPrefetch: true*/
    他们的区别，懒加载是当文件需要使用时才加载，预加载是等其他资源加载完毕时，浏览器空闲的时候就加载。但是预加载有一个缺点就是兼容性不好，一些pc端可以用
    
#### 8. pwa 渐进式网络开发应用程序
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
    在js中的配置： 
```
if('serverWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-work.js')   //构建后会生成这个文件
            .then(() => {
                console.log('sw注册成功了')
            })
            .catch(() => {
                console.log('sw注册失败了')
            })
    })
}
```
    注意事项： 
    1. eslint会不认识window\navigator等全局变量，需要在package.json中增加点配置
        "env": {
            "browser": true //支持浏览器端全局变量
        }
    2. sw代码必须运行在服务器上，

#### 9. 多进程打包
    关键词： thread-loader  
    配置： options: { workers: 2 }
    补充： 进程启动时间600ms，进程的通信也有开销，所以是否开启要根据具体情况来衡量
    使用方法 ：  放在某个loader的后面，千万不要放在前面。且要注意use：[]，loader的执行顺序是从右往左的，所以thread-loader的位置应该是如此： [thread-loader , babel-laoder]
#### 10. externals
避免一些不想要打包的文件被打包进来
使用场景：  有些资源通过CDN引进进来，就在这里拒绝他们参与打包

#### 11. DLL技术
    作用： 对某些库（第三方库 react\vue\jQuery）进行单独打包
    使用： webpack.dll.js进行配置打包
    add-asset-html-webpack-plugin
    1. 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变 
    webpack.DllReferencePlugin({
        manifest: resolve(__dirname,'dll/manifest.json')
    })
    2. 将某个文件打包输出去，并在 html 中自动引入该资源  
    AddAssetHtmlWebpackPlugin({
        filepath: resolve(__dirname,'dll/jquery.js')
    })




### webpack5的一些新特点了解
- 通过持久缓存提高构建性能
- 使用更好的算法和默认值来改善长期缓存
- 通过更好的tree shaking和代码生产来改善捆绑包大小
- 清除怪异状态的内部结构，同时在v4中实现功能而不引入任何重大更改

#### 自动删除Node.js Polyfill
    手动按需引入
#### Chunk ID 
    新的命名规则不再以id(0,1,2)命名
#### Tree Shaking
    能够处理嵌套模块的tree shaking
#### Output 
    新增属性output.ecmaVision 可以生产ES6的代码
#### 给了一些默认值

写得有些凌乱 或许把他们分开来写比较好一点
