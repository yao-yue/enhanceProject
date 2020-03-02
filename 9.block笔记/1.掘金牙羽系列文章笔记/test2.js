/* 测试定时器里面的this指向 */

setTimeout(function() {
    console.log(this)
},1000)