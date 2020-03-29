### notes 
1. 在Next.js中只能通过通过query（?id=1）来传递参数，而不能通过(path:id)的形式传递参数
2. 编程式跳转传递参数
    ```
    function gotoXiaojiejie(){
        Router.push({
        pathname:'/xiaojiejie',
        query:{
            name:'井空'
        }
        })
    }
    ```
3. 路由的6个回调函数（钩子事件，当路由发生变化时，可以监听到这些变化事件）
routerChangeStart
routerChangeComplete
beforeHistoryChange
routeChangeError
hash--- hashCahngeStart hashChangeComplete
Router.event.on('', () => {})
4. 在Next.js框架中提供了getInitialProps静态方法用来获取远端数据，这个是框架的约定，所以你也只能在这个方法里获取远端数据。不要再试图在声明周期里获得，虽然也可以在ComponentDidMount中获得，但是用了别人的框架，遵守别人的约定更好一点
5. Next.js提供的LazyLoading来解决这类问题。让模块和组件只有在用到的时候在进行加载，一般我把这种东西叫做“懒加载”.它一般分为两种情况，一种是懒加载（或者说是异步加载）模块，另一种是异步加载组件
```
懒加载  await import('模块')

异步加载组件
import dynamic from 'next/dynamic'
const One = dynamic(import('../components/one'))
```
6. 开发中常用的模块Moment.js，它是一个JavaScript日期处理类库
7. 既然用了Next.js框架，你就是希望服务端渲染，进行SEO操作
8. 默认不支持css
9. @zeit/next-css包，它的主要功能就是让Next.js可以加载CSS文件
再配置next.config.js配置文件
10. ant design 按需加载,yarn add babel-plugin-import,在.babelrc文件里面配置
11. 踩到的一个坑 加载了antd之后，路由莫名奇妙跳转出错