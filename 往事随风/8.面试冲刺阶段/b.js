// 经典笔试题
// 大数相加
function bigNumberAdd(number1, number2) {
    //数据校验number1是不是纯数字
    let result = '',
        carry = false
    number1 = number1.split('')
    number2 = number2.split('')
    while(number1.length || number2.length || carry) {
        carry = ~~number1.pop() + ~~number2.pop()
        result = carry % 10 + result
        carry = carry > 9
    } 
    return result
}

//数组扁平化
// concat 连接数组
function flattenArray(array) {
    if(!Array.isArray(array)) return;
    return array.reduce((acc, curr) => {
        return acc.concat(Array.isArray(curr)? flattenArray(curr) : curr)
    },[])
}

//数组去重， 这个好像解决不了多重数组,扁平再去重？
function unique(array) {
    if(!Array.isArray(array) || array.length <= 1) return

    var result = []
    array.forEach(item => {
        if(result.indexOf(item) === -1) {
            result.push(item)
        }
    })
    return result
}
// set 只能处理 null 数字 字符串


//求2个数的最大公约数
// 碾转相除
function getMaxCommonDivisor(a,b) {
    //数据校验
    if(typeof a !== 'number' || typeof b !== 'number') return

    if(b === 0) return a
    return getMaxCommonDivisor(b, a % b)
}

//最大公倍数
function getMaxCommonMutiple(a, b) {
    return a * b /getMaxCommonDivisor(a, b)
}


//实现indexOf方法
Array.prototype.indexOf2 = function(array, value) {
    if(!Array.isArray(array)) return
    for(let i = 0, len =array.length; i < len ; i++) {
        if(array[i] === value) {
            return i
        }
    }
    return -1
}

//判断一个字符串是否为回文字符串
// 字符串翻转比较
function isLoopStr(str) {
    let reg = /[\w_]/g,  //匹配所有非单词的字符以及下划线
        newStr = str.replace(reg, '').tolowerCase(),
        reverseStr = newStr.split('').reverse().join('')
    return reverseStr === newStr;
}


//累加函数的功能 
function sum(...args) {
    let result = 0
    result = args.reduce((acc, cur) => {
        return acc + cur
    }, 0)
    let add = function(...args) {
        return args.reduce((acc, cur) => {
            return acc + cur
        }, result)      
    }
    add.valueof = function() {
        console.log(result)
    }
    return add;
}


//简单队列打印数字
class TimeQueue {
    constructor() {
        this.queue = []
        this.time = 0
    }
    addTask(task, t) {
        this.time += t; 
        this.queue.push([task, this.time]);
        return this;
    }
    start() {
        this.queue.forEach(item => {
            setTimeout(() =>{
                item[0]()
            },item[1])
        })
    }
}

//查找一篇文章出现频率最多的单词
// 去除字符串的头尾空格trim()