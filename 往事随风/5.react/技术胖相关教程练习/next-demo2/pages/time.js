import React, { useState } from 'react'
// import moment from 'moment'

//rfce
function Time() {
    const [nowTime, setTime] = useState(Date.now())

    //把方法变成异步模式
    //要用的时候再加载，等待moment加载完成
    //注意使用default
    //这时候就就是懒加载了，可以在浏览器中按F12，
    // 看一下Network标签，
    // 当我们点击按钮时，才会加载1.js,它就是momnet.js的内容
    const changeTime = async () => {
        const moment = await import('moment')
        setTime(moment.default(Date.now()).format())
    }
    return (
        <div>
            <div>显示时间为:{nowTime}</div>
            <div><button onClick={changeTime}>改变时间格式</button></div>
        </div>
    )
}

export default Time

