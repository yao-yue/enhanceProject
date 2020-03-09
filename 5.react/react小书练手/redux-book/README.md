## 笔记

mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据，
然后可以把这个函数的返回结果传给被包装的组件：

可以看到 Header 删掉了大部分关于 context 的代码，它除了 props 什么也不依赖，它是一个 Pure Component，然后通过 connect 取得数据。我们不需要知道 connect 是怎么和 context 打交道的，只要传一个 mapStateToProps 告诉它应该怎么取数据就可以了


mapDispatchToProps 
告诉它我们的组件需要如何触发 dispatch.
它会返回一个对象 dispatchProps.
通过connect函数，它会变成props传入，他是一个控制颜色的函数

这时候这三个组件的重构都已经完成了，代码大大减少、不依赖 context，并且功能和原来一样。


为什么要 mapStateToProps 和 mapDispatchToProps
因为使用dispatch就必须要有store对象这个时候就就要从context上拿store对象，这样就走回了老路，
封装的connect高阶组件正好承担了拿store对象的任务，那么不如就把dispatch的任务传给他，然后往他那边一跑再把处理好的函数作为porps传进来。
dispatch(reducer) {
    state = reducer(state, action)
    listeners.foreach(listener => listener())
}


只会接受 props 并且渲染确定结果的组件我们把它叫做 Dumb 组件，这种组件只关心一件事情 —— 根据 props 进行渲染

根据是否需要高度的复用性，把组件划分为 Dumb 和 Smart 组件，约定俗成地把它们分别放到 components 和 containers 目录下

rt 组件并不意味着完全不能复用，Smart 组件的复用性是依赖场景的，在特定的应用场景下是当然是可以复用 Smart 的。