; (function (window) {
    //三个状态要写很多，用常量保存起来
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    function Promise(excutor) {
        //将当前promise对象保存起来
        const self = this;
        self.status = PENDING;
        self.data = undefined;
        self.callbacks = [];  //其中的元素为对象{onResolved,onRejected}由多个这样的元素组成


        //改变promise状态的函数
        function resolve(value) {
            //一个要点状态只改变一次,如果当前状态不是pending，直接结束
            //下面得self会发生丢失会绑到window上去
            if (self.status !== PENDING) {
                return
            }
            //将状态改为resolved
            self.status = RESOLVED
            //保存value数据
            self.data = value
            //如果有待执行callback函数，放入异步回调队列
            if (self.callbacks.length > 0) {
                //用定时器模拟异步
                setTimeout(() => {
                    self.callbacks.forEach(calbacksObj => {
                        //元素calbacksObj为对象{onResolved,onRejected}
                        calbacksObj.onResolved(value)
                    })
                }, 0)
            }
        }

        function reject(reason) {
            //一个要点状态只改变一次,如果当前状态不是pending，直接结束
            if (self.status !== PENDING) {
                return
            }
            self.status = REJECTED
            self.data = reason
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(calbacksObj => {
                        //元素calbacksObj为对象{onResolved,onRejected}
                        calbacksObj.onRejected(reason)
                    })
                }, 0)
            }
        }

        //捕获异常
        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }


    /* 对于then  
    指定成功或失败的回调函数onResolved, onRejected
    将返回一个新的promise对象
    1.如果是抛出错误，返回的promise对象状态为rejected，reason为error
    2.如果是回调函数返回非promise对象, return的promise就会成功，value为return的值
    3.如果是回调函数返回的是promise对象，return的promise对象的结果就是promise的结果 */
    Promise.prototype.then = function (onResolved, onRejected) {
        onResolved = typeof onResolved === 'function'? onResolved : value => {value}

        //错误穿透的关键
        onRejected = typeof onRejected === 'function'? onRejected : reason => {throw reason}

        const self = this
        //返回一个新的promise对象
        return new Promise((resolve, reject) => {
            //逻辑抽离, 调用指定回调函数处理
            function handle(callback) {
                try {
                    const result = callback(self.data)
                    if (result instanceof Promise) {
                        // 简洁写法 result.then(resolve, reject)
                        //这样理解：如果回调函数返回的结果是promise，我们就把这个promise拆开，看看里面的结果是好是坏
                        result.then(
                            value => resolve(value),  //回调函数为resolve就是把promise拆开的结果resolve出去
                            reason => reject(reason)
                        )
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }

            //如果当前状态还是pending状态，将回调函数保存起来.他们调用时应该改变状态
            if (self.status === PENDING) {
                self.callbacks.push({
                    onResolved(value) {
                        handle(onResolved)
                    },
                    onRejected(reason) {
                        handle(onRejected)
                    }
                });
            } else if (self.status === RESOLVED) {
                setTimeout(() => {
                    handle(onResolved)
                })
            } else {
                setTimeout(() => {
                    handle(onRejected)
                })
            }
        })
    }

    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected)
    }

    // 返回一个指定结果成功的promise
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if(value instanceof Promise) {
                // 使用value的结果作为promise
                //value.then()会执行resolve或reject
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }

    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    //只有所有的promise都成功才成功，只要有一个失败就失败
    Promise.all = function (promises) {
        const values = new Array[promises.length]   //用来保存所有成功value的数组
        let resolvedCount = 0                      //成功计数
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                p.then(
                    value => {
                        resolvedCount ++ 
                        values[index] = value
                        //如果全部成功了，将return的promise改变成功
                        if(resolvedCount === promises.length) {
                            resolve(values)
                        }
                    },
                    reason => {  //只要一个失败了，return的promise就失败
                        reject(reason)
                    }
                )
            })
        })
    }
    // 返回第一个失败或成功的promise
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                p.then(
                    value => {
                        resolve(value)   //一旦成功就将return的promise变为成功
                    },
                    reason => {
                        resolve(reason)
                    }
                )
            })
        })
    }

    Promise.resolveDelay = function( value, delay ) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //类似resolve的处理
                if(value instanceof Promise) {
                    // 使用value的结果作为promise
                    value.then(resolve, reject)
                } else {
                    resolve(value)
                }
            }, delay)
        })
    }

    //向外暴露Promise函数
    window.Promise = Promise
})()