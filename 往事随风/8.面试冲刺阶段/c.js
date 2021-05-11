//用promise封装ajax
function $Ajax(url, method = 'GET', data ={}) {
    // method = method.toUpperCase()
    function getQueryString(data) {
        let result = ''
        for(const key in data) {
            result = `key = ${data[key]}&`
        }
        return result

    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        let queryString = getQueryString(data);
        url += (~url.indexOf('?')) ? queryString : '?' + queryString
        xhr.open(method, url, true)
        //xhr.onload = funcition() {}  == (readyState ===4)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const result = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: xhr.getAllResponseHeaders(),
                    data: xhr.response || xhr.responseText
                  }
                if ((xhr.status >= 200 && xhr.status < 300 )|| xhr.status == 304) {
                    resolve(result)
                } else {
                    reject(result)
                }
            }
        }
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.withCredentials = true;  //跨域是否携带cookie
        xhr.onerror = function () {
            reject(new TypeError('请求出错'))
        }
        xhr.timeout = 2000 // 超时时间，单位是毫秒
        xhr.ontimeout = function () {
            // XMLHttpRequest 超时，在此做超时的处理
            reject(new TypeError('请求超时'))
        }
        xhr.onabort = function () {
            reject(new TypeError('请求被终止'))
        }
       
        if(method === 'POST') {
            xhr.send(queryString)
        }
        else {
            xhr.send()
        }
    })
}
//补充 js的错误类型  
// 1.SyntaxError(语法错误) 解析代码时发生的语法错误 eg:var 1a; ...
// 2.ReferenceError(引用错误) a.引用了一个不存在的变量 eg: ...
// 3.RangeError(范围错误) 超出有效范围 eg:var a= new Array...
// 4.TypeError(类型错误) a.变量或参数不是预期类型,比如,对字符串、布尔值、数值... 好像可以瞎吉儿调用
// URIError  、  EvalError

// onreadystatechange 的5种状态
// 0创建xhr 1open被调用2 send被调用 3正在下载 4下载完成
// contentType的类型
// application/urlencoded
// application / from-data
// xml


//数的遍历，深度优先遍历-先序、中序、后序。广度优先遍历，层序遍历

//防抖 运用场景 窗口放大、输入框输入1000毫秒搜索、表单验证输入1000毫秒后验证
// 一个细节 是否要让this指向调用他的函数  还是返回闭包的调用者
// 比如debounce(validator, 1000)
// 和 fn.debounce(cb, timer)
function debounce(fn, delay, flag) {
    // flag 用于需要立即执行一次的场景
    let timer = null
    return function(...args) {
        let self = this //防止定时器里面的this丢失
        timer && clearTimeout(timer)
        if(flag && !timer) {
            fn.apply(self, args)
        }
        timer = setTimeout(() => {
            fn.apply(self,args)
        },delay)
    }
}

//节流用时间戳完成
function throttle(fn, interval) {
    let last = 0
    return function(...args) {
        if(Date.now() - last > interval) {
            last = Date.now
            fn.apply(this, args)
        }
    }
}

//节流防抖结合版，第一次和最后一次都会触发,解释一下，就是最后点击一下的时候如果是在节流的时间内，过了个时间限度到了我们还是给他执行一下。
function enhanceThrottle(fn, time) {
    let last = 0, timer =null
    return function (...args) {
        if(Date.now() - last > interval) {
            timer && clearTimeout(timer);  //清除定时器
            timer = null                  //要声明一下
            last = Date.now
            fn.apply(this, args)
        }else if(!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
            },time)
        }
    }
}

//ES6写bind()
Function.prototype.myBind = function (context,...args1) {
    if (this === Function.prototype) {
      throw new TypeError('Error')
    }
    const _this = this
    return function F(...args2) {
      // 判断是否用于构造函数
      if (this instanceof F) {
        return new _this(...args1, ...args2)
      }
      return _this.apply(context, args1.concat(args2))
    }
  }
f1.bind(obj, args)()

// 尽量写复古版把
Function.prototype.call2 = function(context = window, args) {
    context.fn = this
    // 执行一遍然后删除
}

//写出一个惊艳面试官的深拷贝
// 考虑各种类型


//数组乱序 洗牌算法
// 从最后一个元素开始，从数组中随机选出一个位置，交换，直到第一个元素。
function disorder(array) {
    const length = array.length
    let current = length -1
    let random
    while (current > -1) {
        random = Math.floor(length * Math.random())
        [array[current],array[random]] = [array[random],array[current]]
        --current;
    }
    return array
}


// 二叉树的层序遍历 BFC
function levelOder(root) {
    if(!root) {
        return []
    }
    const result = [],
        queue = [root]
    while (queue.length) {
        const level = queue.length  //当前层的节点数
        const currLevel = []     //当前层的节点数组
        for(let i=0; i < level; i++) {
            const node = queue.shift()
            currLevel.push(node.value)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        result.push(currLevel)   //把该层结果放进去
    }
    return result
    
}