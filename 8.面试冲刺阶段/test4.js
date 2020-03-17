// Function.prototype.bind2 = function (conetxt) {
//     var args = Array.prototype.slice.call(arguments, 1)
//     var self = this   //闭包保留调用bind2的对象
//     var fbound = function () {
//         var args2 = Array.prototype.slice.call(arguments, 1)
//         //如果bind返回的函数作为构造函数，此时this的指向将改变，因为new的优先级是大于call\bind这些的
//         self.apply(this instanceof self ? this : context, args.concat(args2));

//     }
//     fbound.prototype = this.prototype   //修改返回函数的原型指向调用bind的那个函数对象
//     return fbound 
// }

// fn = function() {
//     show = function() {
//         console.log('fn的this',this )
//     }
    
// }
// obj1 = {
//     hello: 'fuck' ,
//     show: function() {
//         console.log('obj1的this',this)
//     }
// }
// let a = new fn.bind2(obj1)
// console.log(a)
// console.log(a.__proto__)   //{ bind2: [Function] }
// console.log(a.__proto__.prototype)

// a = () =>{

// }
// b = []
// console.log(b instanceof Array)
// console.log(typeof(b))  //object
// console.log(typeof(a))  //function

// let a = new Promise((resolve, reject)=>{
//     console.log(1)
//     resolve(3)
// })
// a.then((data) =>{
//     console.log('then:',data)
// },() =>{
    
// })
// console.log(2)

// let b = Promise.resolve(a)
// b.then(data => console.log(data))
// console.log(b)

// function Human() {
//     this.name = ''
// }
// function Man() {
//     Human.call(this)
// }
// Human.prototype.run = function() {
//     console.log(this.name +'I am RUNING')
// }

// function inherit(Child, Parent) {
//     const F = function(){}
//     F.prototype = Parent.prototype     //构造函数的prototype指向原型
//     Child.prototype = new F()          //child--也是构造函数
//     Child.__proto__.constructor = Child     // child -> new F() -> parent   
// }

// inherit(Man, Human)
// function Woman(name) {
//     Human.call(this)
//     this.name = name
// }
// inherit(Woman, Human)

// const xiaoHong = new Woman('xiaohong')
// xiaoHong.run()
// console.log(xiaoHong.__proto__.__proto__)

// Function.prototype.bind2 = function (conetxt) {
//     var args = Array.prototype.slice.call(arguments, 1)
//     var self = this   //闭包保留调用bind2的对象
//     var fbound = function () {
//         var args2 = Array.prototype.slice.call(arguments, 1)
//         //如果bind返回的函数作为构造函数，此时this的指向将改变，因为new的优先级是大于call\bind这些的
//         self.apply(this instanceof self ? this : context, args.concat(args2));

//     }
//     fbound.prototype = this.prototype   //修改返回函数的原型指向调用bind的那个函数对象
//     return fbound
// }
// fn1 =function() {}
// obj = {
//     show() {

//     }
// }

// let a = new fn1.bind2(obj)
// Function.prototype.show = function(){
//     console.log(this)
// }
// console.log(a.__proto__.__proto__)
// a.show()

function $jsonp(url, opts ={}, data = {}) {
    getQueryString = (data ) => {
        let ret = ''
        for(let key  in data) {
            const value = data[key] !== undefined? data[key] : ''
            ret += `${key}=${encodeURIComponent(value)}&`
        }
        return ret
    }
    return new Promise((resolve, reject) =>{
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
        window[ident] = function(res) {
            if(window[ident]) {   //执行到这里说明拿到了数据
                clearup()
            }
            resolve(res)
        }
        //清理 
        function cleanup(script) {
            if(script.parentNode) {
                script.parentNode.removeChidl(script)
            }
            if(timer) {
                clearTimeout(timer)
            }
        }
        //超时处理
        if(timeout) {
            timer = setTimeout(() => {
                cleanup();       //清理 
                reject('Timeout')
            },timeout)
        }
        let qs = getQueryString(data)
        url += (~url.indexOf('?')?'':'?') + (qs?qs + param : param) + '=' + encodeURIComponent(ident)
        const script = document.createElement('script')
        script.src = url
        const target = document.getElementsByTagName('script')[0] || document.head
        target.parentNode.insertBefore(script)
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
$jsonp(url1, opts1,data1).then(data => console.log(data))