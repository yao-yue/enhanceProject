##  async(异步)
1. async函数的返回值是promise对象。 
    ```
    async function fn1() {}
    let p = fn1()   p是promise对象
    ```
    promise对象的结果由async函数执行的返回值决定

2. await 表达式
    右侧一般是promise 如果是promise就返回promise的结果
    如果是值就返回值

3. await必须写在async函数里面，可以用try catch来捕获异常

