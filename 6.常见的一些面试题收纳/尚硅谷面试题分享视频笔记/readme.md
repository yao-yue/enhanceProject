### 看视频的时候带着总结去思考会更有收获一点

### 1.封装函数进行字符串驼峰命名
考察一些数组的方法
split('-')  
charAt(0)获取元素中的第一个字符
toUpperCase()
substr(start,end)取字符串子串
.join('')数组转换成字符串


### 2.去掉数组中重复的数据
一个笨方法 
创建一个新数组，把元素的第一个元素放进去。  
遍历原数组中的每一个元素分别和新数组的每一个元素进行比较   
当原数组中的值和新数组中的值相同时就进行下一个比较    
拿原数组中的某个元素比较到新数组中的最后一个元素还没有重复时就将数据插入新数组
时间复杂度为O（n^2)

### 3.1px物理像素实现
第一种方案：js操作meta标签进行缩放，最后页面中元素宽高，再按比例反向乘回来
1. window.onload = function()  浏览器页面加载完
2. 获取像素比 dpr window.devicePixelRatio
3. 缩放比例  scale = 1/dpr
4. 获取meta标签querySelector('meta[name="viewpoint"]')
5. metaNode.setAttribute('content','省略')
6. 将页面中元素宽度高度，反向乘回来(前提是全部都用rem单位)
    document.querySelector('html').style.fontSize = (window.innerWidth || document.documentElement.clientWidth) * dpr + 'px'

第二种方案：用伪元素标签加媒体选择器
```
#box:before{
    content: '';
    position: absolute;
    l0,b0;
    width: 100%
    height: 1px;
    bgc;
}
@media screen and (-webkit-min-device-pixel-ratio:2) {
    #box:before{
        transform: scale(0.5)//or 0.33333
    }
}
```


### 水平垂直居中
讲的几个方法都会 ，发现了一个自己不了解的，补充一下
```
//应该是只适用webkit内核
display: -webkit-box;
-webkit-box-pack: center;
-webkit-box-align: center;
```

### css创建一个三角形
简单说下思路：box宽高为0，边框有值 solid,border-[top]-color: red/transparent;

 

### 移动端rem适配
解决的问问题： 让同一个元素在不同分辨率的屏幕上显示出一样的效果。
获取屏幕宽度，然后按照自己要求的比例，设置根节点上字体大小（px单位）



### 求背景图片左边到盒子左侧边框的距离
一些不熟悉的属性： background-origin 设置背景图片起始源的位置(从左上角计算);
background-position： -50px 0; 是按照左上角坐标轴来进行移动的
复习下盒子模型 margin - border - padding -content
标准盒子。content-box     
ie盒子(怪异盒子模型) border-box 即包括padding和border;
box-sizing ： content-box || border-box || inherit;


### js综合面试题
函数提升优先，同名且覆盖
关于new:  
new的实现 创建一个空对象，原型链接到原型上，构造函数this指向对象。
new Foo.getName();  // new (Foo.getName)()   
new Foo().getName();  // (new Foo()).getName()


### 节流和防抖
节流： 一个函数执行一次后，只有大于设定的执行周期才会执行第二次。   
有一个需要频繁出发函数，出于优化性能角度，在规定时间内，只让函数触发的第一次生效。
- 这里简单的补充下call、apply、bind的同异，他们都是修改this指向的，第一个参数都是this的指向对象。第二个参数，call直接分个放进去，apply传数组，bind返回的是一个函数，参数和call一样
```
//节流--- 第一次
function throttle(fn, delay) {
    //记录当前时间
    let lastTime = 0;
    //闭包,不用闭包的话每次lasttime都是0
    return function() {
        let nowTime = Date.now()
        if( nowTime - lastTime  > delay) {
            //修正this丢失
            fn.call(this);   or  fn.apply(this,arguments)
            //同步时间
            lastTime = nowTime;
        }
    }
}
```

```
//防抖， 在规定时间内只让最后一次生效
function debounce(fn, delay) {
    let timer = null;
    return function() {
        //清除上一次的延时器
        if(timer) {
        clearTimeout(timer);
        }
        //重新设置新的延时器
        timer = setTimeout(funtion() {
            fn.call(this);
        }, delay)
    }
}
发现了一个问题，他这里的this有问题，经测试定时器里面的this指向Timeout对象，故上面的this应应该用闭包来保留一下。  let context = this

```

场景：  节流鼠标滚轮   防抖-按钮。比如提交按钮


### 前端跨域
同源策略： 浏览器的安全机制。协议名，域名，端口号
跨域，就是违背同源策略。
解决跨域： jsonp cors 服务器代理...
浏览器<script>标签的天然跨域属性
1. 创建script标签
2. 设置回调函数fn
3. 设置script的src属性，设置请求地址?callback=fn
4. 让script标签放上去---appendChild
```
var script = document.createElement('script');
function getData(data) {
    //数据请求回来会触发这个函数
    console.log(data);
}
script.src = 'http://localhost:8080?callback=getData';
document.body.appendChild(script);

```


### nodejs的事件轮询机制。
**注意辨析nextTick和seImmediate
借助libuv库实现的。事件轮询计旨，分为6个阶段
1. timers定时器阶段,记时和执行到点的定时器setTimeout()回调函数
2. pending callbacks 某些系统操作（例如tcp错误类型）的回调函数
3. idle, prepare 准备工作
4. poll 轮询阶段 
    如果轮询队列不空，依次同步取出轮询队列中第一个回调执行函数执行，直到轮询队列为空或者达到系统最大的限制
    如果轮询队列为空，之前设置过setImmediate()函数直接进入下一个check阶段
                    如果没有，在当前poll阶段等待直到轮询队列添加回调函数-->执行
                    或者定时器到点了，也会去一个阶段
5. check阶段
    执行setImmediate设置的回调函数
6.close callback 关闭阶段
    执行close事件回调函数
process.nextTick() 能在任何阶段优先执行
总结： timer定时器阶段 -> pending callbacks某些系统操作的回调函数 -> idle,prepare准备工作 -> poll轮询阶段  -> check阶段 -> 关闭阶段



### 从一个url地址到最终页面渲染完成发生了什么.
1. DNS解析，将域名地址解析为ip地址
    浏览器DNS缓存
    系统DNS缓存
    路由器DNS缓存
    网络运行商DNS缓存
    递归查询， 举例 hbw.github.com
    - .com域名下查找DNS解析
    - .github域名下查找DNS解析
    - hbw域名下查找解析
    - 找不到了，报错
上面的说法有些错误，域名解析课本上解释： 一般都是迭代递归查询。因为递归搜索对根域名服务器的负载太大了。
先查本地域名服务器，在到根域名服务器(共有13个），然后根域名服务器告诉你去查哪个顶级域名服务器，顶级域名服务器再告诉本地域名服务器去查哪个授权域名服务器。
2. TCP连接，三次握手，
    第一次握手，由浏览器，告诉服务其我要发送请求了
    第二次握手，由服务器，告诉浏览器我准备接受了，你发送把
    第三次握手，由浏览器，我马上就发，你准备好
    为什么要三次握手： 如果只握手一次，服务器很忙你就发过去了，服务器是接收不了的
    如果只握手两次，万一这个浏览器突然繁忙了，服务器干等着也不行，所以准备发的时候要跟服务器说一下
3. 发送请求
4. 响应报文
5. 渲染页面
    遇见HTML标记，浏览器调用html解析器解析成token并构建成dom树
    遇见style/link标记，浏览器调用css解析器，处理css表及并构建cssom树
    遇见script标记，调用javascript解析器，处理script代码（绑定事件，修改dom/cssom树）
    将dom树和cssom树合并成一个渲染树
    根据渲染树来计算布局，计算每个节点的几何信息（布局）
    将各个节点颜色回值到屏幕上（渲染）
注意：这几个步骤不一定按照顺序执行
6. 断开链接 tcp四次挥手
    第一次挥手，由浏览器发起，发送给服务器，我东西发送完了（请求报文）你准备关闭把
    第二次挥手，由服务器发起，告诉浏览器，我东西接受完了（请求报文），我准备关闭了，你也准备把
    第三次挥手，由服务器发起，我东西发送完了（响应报文），你准备关闭把
    第四此挥手，由浏览器发起，我东西接受完了，我准备关闭了（响应报文）你准备关闭把


### 变量提升 预处理
函数提升--提前定义该函数
fun()       
function fun() {}   //正常执行   
执行上下文 excute context。要区别于作用域
三个属性（变量对象、this、作用域链）


### 宏任务和微任务
宏任务 setTimeout setInterval requreAnimationFrame
1. 第一个宏任务队列中只有一个任务，执行主线程的js代码
2. 宏任务队列可以由多个

微任务 promise.then process.nextTick
1. 只有一个微任务队列，当上一个宏任务完成时就会查看微任务队列中有没有任务，有的话全部执行完


### vue的mvvm实现原理
1. 模板解析
2. 数据绑定
