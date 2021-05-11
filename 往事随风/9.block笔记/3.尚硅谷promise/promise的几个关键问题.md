## 几个关键问题

### 改变状态
    resolve() ; reject() ; throw new Error() 抛出异常，promise变成rejected失败状态 

### 什么时候才能得到数据
1. 如果先指定的回调，那当状态发生改变时，回调函数就会调用得到数据
2. 如果先改变状态，那指定回调时，回调函数就会直接调用
    常规的都是先指定回调，后改变的状态。先改变状态就是不延迟直接resolve，或者让.then()延迟到一定时间后再执行

### Promise.then()返回新的promise的状态是由什么决定
。promise.then()将返回一个新的promise
是由回调函数的执行结果决定
    比如抛出异常，新的promise变为rejected，reason为抛出的异常                   throw 5
    如果返回的是非promise的任意值，新的promise状态变为resolved，value为返回值：  return 3
    如果返回的是一个新的promise对象，此promise的resolve就会成为promise.then()返回的新promise的value   return Promise.resolve(3)

### promise如何串联多个操作任务
.then()来串联任务，如果是同步任务就直接return, 如果是异步任务就要return new Promise()封装一下。
```
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('执行任务1（异步）')
        resolve(1)
    }, 1000)
})
.then(value => {
    console.log('任务1的结果:', value)
    console.log('执行任务2（同步）')
    return 2
})
.then(value => {
    console.log('任务2的结果：'， value)
    return new Promise((resolve, reject) => {
        //启动任务3（异步）
        setTimeout(() => {
            console.log('执行任务3（异步）')
            resolve(3)
        },1000)
    })
})
.then(value => {
    console.log('任务3的结果：'+ value)
})
```

### 异常传递(穿透)、
没写reject回调函数， 默认为  reason => {throw reason}


### 中断promise 
返回一个pending的promise
.catch(reason => {
return new Promise(() => {})
})