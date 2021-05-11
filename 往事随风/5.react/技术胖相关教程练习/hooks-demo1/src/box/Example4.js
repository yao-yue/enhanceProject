import React, { useState, createContext, useContext } from 'react';

const CountContext = createContext()
function Counter() {
    const count = useContext(CountContext)  //一句话就可以得到count
    return (<h2>{count}</h2>)
}


function Example4() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button>
            {/* 把count变量允许跨层级实现传递和使用了（也就是实现了上下文） */}
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}
export default Example4;