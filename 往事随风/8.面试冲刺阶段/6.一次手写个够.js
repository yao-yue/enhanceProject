// 1. 手写call apply bind
Function.prototype.call2 = function (context = window) {
    //fn可能会重名，可以用symbel优化一下
    context.fn = this  //this指向调用call2的函数
    //获得参数？
    var args = []
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']')  //这里args里面存的是一个个字符串['arguments[1]','arguments[2]']
    }
    //调用一下F
    var result = eval('context.fn(' + args + ')')
    // 删除F
    delete context.fn
    return result
}

// 手写apply 注意arr 传入的参数校验
Function.prototype.apply2 = function (context = window, arr) {
    context.fn = this
    var ret = null
    if (!arr) {
        ret = context.fn()
    } else {
        var agrs = []
        for (let i = 0, len = arr.length; i <= len; i++) {
            args.push('arr[' + i + ']')
        }
        ret = eval('context.fn(' + args + ')')
        delete context.fn
        return ret
    }
}


// 手写bind
Function.prototype.bind2 = function (conetxt) {
    var args = Array.prototype.slice.call(arguments, 1)
    var self = this   //闭包保留调用bind2的对象
    var fbound = function () {
        var args2 = Array.prototype.slice.call(arguments, 1)
        //如果bind返回的函数作为构造函数，此时this的指向将改变，因为new的优先级是大于call\bind这些的
        self.apply(this instanceof self ? this : context, args.concat(args2));

    }
    fbound.prototype = this.prototype   //修改返回函数的原型指向调用bind的那个函数对象
    return fbound
}

// 手写new
function createObj() {
    var obj = {}
    constructor = Array.prototype.shift.call(arguments)  //arguments里的第一个元素
    obj.__proto__ = constructor.prototype
    var ret = constructor.apply(obj, arguments)    //arguments剩下的刚刚好
    return typeof ret == 'object' ? obj : ret;    //如果传的constructor是基本类型的值就返回，我感觉早点校验或许会更好点
}


//手写promise
; (function (window) {
    const PENDING = 'PENDING'
    const RESOLVED = 'RESOLVED'
    const REJECTED = 'REJECTED'

    function Promise(excutor) {
        
        this.status = PENDING,
            this.data = undefined,
            this.callbacks = []    // 存储类型[{onResolved,onRejected},{onResolved,onRejected}]

        function resolve(value) {
            if (this.status !== PENDING) {
                return
            }
            this.status = RESOLVED
            this.data = value
            //把回调队列中响应的回调函数拿出来放到微队列中去
            this.callbacks.forEach(item => {
                //微队列
                item.onResolved()
                //微队列
            });
        }

        function reject(reason) {
            if (this.status !== PENDING) {
                return
            }
            this.status = REJECTED
            this.data = reason
            //把回调队列中响应的回调函数拿出来放到微队列中去
            this.callbacks.forEach(item => {
                //微队列
                item.onRejected()
                //微队列
            });
        }

        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    Promise.prototype.then = function (onResolved, onRejected) {
        //参数校验，异常传透
        onResolved = typeof onResolved === 'function'? onResolved : value => {value} //'function'
        onRejected = typeof onRejected === 'function' ? onRejected: reason => {throw reason}
        //对于then的处理
        // 1.如果回调函数执行结果异常，返回的promise状态为Rejected
        // 2.如果回调函数执行结果是一个基本类型，返回的promise状态为Resolved,value为该执行结果
        // 3.如果回调函数的执行结果是一个promise,返回的promise根据此promise来决定状态和结果

        // 处理逻辑函数
        let self = this
        return new Promise((resolve, reject) => {
            function handle(callback) {
                const result = callback(self.data)
                try {
                    if (result instanceof Promise) {
                        result.then(resolve, reject)
                    } else {
                        reject(result)
                    }
                } catch (error) {
                    reject(error)
                }
               
            }
            if (this.status === PENDING) {
                this.callbacks.push({
                    onResolved(value) {    //对象里面的方法
                        handle(onResolved)
                    },
                    onRejected(reason) {
                        handle(onRejected)
                    }
                })
            } else if (this.status === RESOLVED) {
                //微队列, 因为就是是同步resolve,then里面的回调函数也是在
                handle(onResolved)
                //微队列
            } else if (this.status === REJECTED) {
                //微队列
                handle(onRejected)
                //微队列
            }
        })

        

}

    //返回一个状态由传入value决定的promise对象
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if(value instanceof Promise) {
                value.then(resolve,reject)
            }else {
                resolve(value)
            }
        }) 
    }

    Promise.all = function(promises) {
        const values = new Array(promises.length) //用来保存所有成功值的数组
        let successCount = 0     //成功计数
        //因为要把promises里面每个任务都拿出来跑,这肯定就是异步的,即需要用promise来包装
        return new Promise((resolve, reject) => {
            promises.forEach((item, index) => {
                item.then((data) => {
                    successCount++
                    values[index] = data
                    if(successCount === promises.length) {
                        resolve(values)
                    }
                },(reason) => {
                    reject(reason)
                })
            })
        })
    }
    Promise.race = function(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(item => {   //只要有一个成功或者失败了就ok了
                item.then(resolve,reject)
            })
        })
    }
    // 关于delay,就是推迟一段时间再解包.
    // setTimeout(() =>{
    //     if(value instanceof Promise) {
    //         xxxx
    //     }
    // },delay)

    window.Promise = Promise
})(window)


//封装一个jsonp
function $jsonp(url, opts = {}, data = {}) {
    getQueryString = (data) => {
        let ret = ''
        for (let key in data) {
            const value = data[key] !== undefined ? data[key] : ''
            ret += `${key}=${encodeURIComponent(value)}&`
        }
        return ret
    }
    return new Promise((resolve, reject) => {
        const {
            prefix = '__jp',
            timeout = 6000,
            param = 'callback'
        } = opts
        //拼接queryString
        //jsop的回调函数名处理
        //挂载
        let count = 0
        let ident = prefix + count++
        let timer = null
        window[ident] = function (res) {
            if (window[ident]) {   //执行到这里说明拿到了数据
                cleanup()
            }
            // resolve(res)
        }
        //清理 
        function cleanup() {
            //开始清除逻辑
            if (script.parentNode) {
                script.parentNode.removeChild(script)
            }
            if (timer) {
                clearTimeout(timer)
            }
        }
        //超时处理
        if (timeout) {
            timer = setTimeout(() => {
                cleanup();       //清理 
                reject('Timeout')
            }, timeout)
        }
        let qs = getQueryString(data)
        url += (~url.indexOf('?') ? '' : '?') + (qs ? qs + param : param) + '=' + encodeURIComponent(ident)
        resolve(url)
        script = document.createElement('script')
        script.src = url
        let target = document.getElementsByTagName('script')[0] || document.head
        target.parentNode.insertBefore(script, target)
    })
}

// http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
const data1 = {
    location: '北京',
    output: 'json',
    ak: '3p49MVra6urFRGOT9s8UBWr2'
}
const url1 = `http://api.map.baidu.com/telematics/v3/weather`
const opts1 = {}
$jsonp(url1, opts1, data1).then(data => console.log(data))


//手写继承
function Human() {
    this.name = 'human'
}
function Man() {
    this.name = 'man'
}
Human.prototype.run = function() {
    console.log('I am RUNING')
}

function inherit(child, parent) {
    const F = function(){}
    F.prototype = parent.prototype     //构造函数的prototype指向原型
    child.prototype = new F()  
    child.__proto__.constructor = child     // child -> new F() -> parent   
}
inherit(Man, Human)


//封装一个ajax
function $ajax(url, method = 'GET', data={}) {
    function getQueryString(data) {
        let ret = ''
        for(let key in data) {
            const value = data[key]?data[key] : ''
            ret = `${key}=${encodeURIComponent(value)}`
        }
        return ret
    }
    return new Promise((resolve, reject) => {
        let qs = getQueryString(data)
        url += (~url.indexOf('?')?'':'?') + qs
        let xhr = new XMLHttpRequest()
        // xhr.onload == xhr.onreadystatechange -> readyState4
        xhr.open(method, url, true)
        xhr.onload = function() {
            const result = {
                status : xhr.status,
                headers: xhr.getResponseHeader(),
                data: xhr.response || xhr.responseText
            }
            if((xhr.status >= 200 && xhr.status <300) || xhr.status == '304') {
                resolve(result)
            }else {
                reject(result)
            }
        }
        xhr.timeout = 6000
        xhr.ontimeout = function() {
            reject('获取超时')
        }
        xhr.onerror = function() {
            reject('获取出错')
        }
        xhr.onabort = function() {
            reject('获取被终止')
        }
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        if(method === 'POST') {
            xhr.send(qs)
        }else {
            xhr.send()
        }
    })
}

