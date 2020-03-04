### 宏队列微队列补充
宏队列每次取出一个到主线程运行，并不是把宏队列里面的任务全部运行完，而微队列就是全部运行完。    
当运行完一个宏任务时，准备拿下一个宏任务前会检查微队列是否有任务，如果有任务就去优先完成微队列

宏任务：  定时器、 DOM操作、ajax回调
微任务： promise 、 mutationObserver
[参考](https://upload-images.jianshu.io/upload_images/14081283-bb7e0ee0ad9afea9.png?imageMogr2/auto-orient/strip|imageView2/2/w/654/format/webp)

宏任务是 浏览器或者node发出的任务
微任务是 JS引擎发起的任务