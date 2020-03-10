## 简单笔记

useState 状态非常简便
useState不能在if...else...这样的条件语句中进行调用，必须要按照相同的顺序进行渲染


useEffect  代替生命周期
1. React首次渲染和之后的每次渲染都会调用一遍useEffect函数 didmount didupdate
2. useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的
3. 返回一个函数的形式进行解绑，每次状态发生变化，useEffect都进行了解绑；useEffect的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。当传空数组[]时，就是当组件将被销毁时才进行解绑，这也就实现了componentWillUnmount的生命周期函数。
4. 但是如果我们想每次count发生变化，我们都进行解绑，只需要在第二个参数的数组里加入count变量就可以了


useContext，它可以帮助我们跨越组件层级直接传递变量，实现共享，通过和useReducer的配合使用，可以实现类似Redux的作用。
使用： 
1. 在react里面引入
2. const CountContext = createContext()
3. 提供
```
<CountContext.Provider value={count}>
    <Counter />            
</CountContext.Provider>
```
子组件使用 useContext
const count = useContext(CountContext)  //一句话就可以得到count

useReducer
const [state, dispatch] = useReducer(reducer, initialState, init)


useMemo主要用来解决使用React hooks产生的无用渲染的性能问题
失去了shouldCompnentUpdate（在组件更新之前）这个生命周期.
这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。useMemo和useCallback都是解决上述性能问题的.
使用useMemo，然后给她传递第二个参数，参数匹配成功，才会执行


useRef在工作中虽然用的不多，但是也不能缺少。它有两个主要的作用:

用useRef获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。
1. 创建钩子  xxx = useRef(null)
2. 放到标签上  ref = { xxx}

用useRef来保存变量，这个在工作中也很少能用到，我们有了useContext这样的保存其实意义不大，但是这是学习，也要把这个特性讲一下。

这个方法使用useCallback，目的是为了缓存方法(useMemo是为了缓存变量)
