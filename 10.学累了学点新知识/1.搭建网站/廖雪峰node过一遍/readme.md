## 过一遍 熟悉一下

### 笔记
为什么要调用await next()？
koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情
我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能

await next(); // 调用下一个middleware

middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序

最后注意ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。

集中处理URL的middleware，它根据不同的URL调用不同的处理函数
引入koa-router这个middleware，让它负责处理URL映射

## 处理post请求
解析request的body
middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上

## 逻辑分离
如果能把URL处理函数集中到某个js文件，或者某几个js文件中就好了，然后让app.js自动导入所有处理URL的函数。这样，代码一分离，逻辑就显得清楚了