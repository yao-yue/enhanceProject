import React, { useState, useEffect } from 'react'

function Example() {
    const [count, setCount] = useState(0);
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
        return ()=>{
            //解绑时执行的函数？
            console.log('====================')
        }
    },[count])
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>add</button>
        </div>
    )
}

export default Example

