//用promise封装ajax
function $Ajax(method, url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        //根据请求方法来设置
        // post请求可以用FormData对象
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.response)
                } else {
                    reject(new Error(this.statusText))
                }
            }
        }
        xhr.onerror = function () {
            reject(new Error(this.statusText))
        }
        xhr.timeout = 2000 // 超时时间，单位是毫秒
        xhr.ontimeout = function (err) {
            // XMLHttpRequest 超时，在此做超时的处理
            reject(err)
        }
        xhr.responseType = 'json'
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.send()
    })
}
// onreadystatechange 的5种状态
// 0创建xhr 1open被调用2 send被调用 3正在下载 4下载完成
// contentType的类型
// application/urlencoded
// application / from-data
// xml


//数的遍历，深度优先遍历-先序、中序、后序。广度优先遍历，层序遍历