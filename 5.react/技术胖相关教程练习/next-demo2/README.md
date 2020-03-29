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
