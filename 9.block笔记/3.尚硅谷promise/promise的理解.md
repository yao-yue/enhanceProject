## 理解

### 是什么
1. 抽象表达：是js异步编程的新的解决方案
2. 具体表达：语法上说是一个构造函数、功能上说就是封装一个异步操作并可以获得其结果

### 状态改变
pending - resolved
        - rejected
只有这两种状态改变，每个promise对象只能改变一次状态

### promise的基本使用
1. 创建一个新的promise对象p
2. 在执行器函数内定义异步操作任务
3. 成功调用resolve(value) 失败调用reject(reason)
4. p.then

### 为什么promise好
1. 指定回调函数的方式更加灵活。旧的必须在启动异步任务之前指定
2. 支持链式调用，可以解决回调地狱问题（回调函数嵌套调用外部依赖于内部回调，不便于阅读，也不便错误处理）

### 怎么用promise
1. API 语法、接口
2. Promise.prototype.then(onResolve, onRejected)  里面是两个回调函数，一个对应成功的回调一个对应失败的回调。将返回一个新的promise对象
3. Promise.resolve()简洁语法
4. Promise构造函数。里面传入一个执行器函数excutor，同步执行。
    执行器函数里面有2个函数resolve和reject。内部定义成功时调用resolve.只能改变一次状态
5. p.then()指定成功或失败的回调onResovle
6. .catch(onRejected )类似于.then(undifine, onRejected)
7. Promise.all([多个promise对象])全成功才成功，有一个失败就失败了
8. Promise.race([多个promise对象])，第一个成功失败的结果