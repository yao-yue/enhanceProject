### 整体结构
1. 构造函数
    3个属性 status data callbacks[{onResolved,onRejected},{onResolved,onRejected}]
    function resolve和reject.  注意闭包this 
    执行器函数执行 try catch捕获异常
    状态只能改一次   如果当前状态不是pending 直接结束.

2. Promise.prototype.then
因为不知道是先获得回调还是先获得状态,所以需要条件判断stats的状况来做出下一步的操作。
要返回一个新的promise对象.还要改变return的promise状态.
实现异常传透




```
//定义模块暴露。
(function(window) {
    funtion Promise(excutor) {
        this.status = "pending";
        this.data = undefined;
        this.callbacks = [];  //其中的元素为对象{onResolved,onRejected}由多个这样的元素组成

//改变promise状态的函数
        function resolve(value) {
            //将状态改为resolved
            this.status = 'resovled'
            //保存value数据
            this.data = value
            //如果有待执行callback函数，放入异步回调队列
            if(this.callbacks.length > 0) {
                this.callbacks.forEach(calbacksObj => {
                    calbacksObj.onResolved(value)
                })
            }
        }

        function reject(reason) {

        }

        excutor(resolve, reject)
    }


    //对于then  
    指定成功或失败的回调函数onResolved, onRejected
    将返回一个新的promise对象
    如果是抛出错误，返回的promise对象状态为rejected，reason为error
    如果是return非promise对象,promise对象状态为resolved，value为return的值
    如果是return promise对象，返回的promise对象的结果就是promise的结果
    Promise.prototype.then = function(onResolved, onRejected) {

    }

    Promise.prototype.catch = funtion(onRejected) {

    }

    返回一个指定结果成功的promise
    Promise.resolve = function() {

    }

    Promise.reject = function() {

    }

    只有所有的promise都成功才成功，只要有一个失败就失败
    Promise.all = function(promises) {

    }
    返回第一个失败或成功的promise
    Promise.race = function(promises) {

    }

    //向外暴露Promise函数
    window.Promise = Promise
})()

```
