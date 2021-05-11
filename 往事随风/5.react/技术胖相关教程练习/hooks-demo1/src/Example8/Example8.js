import React, { useRef} from 'react';
function Example8(){
    const inputEl = useRef(null)
    const onButtonClick=()=>{ 
        inputEl.current.value="Hello ,JSPang"
        console.log(inputEl) //输出获取到的DOM节点
    }
    return (
        <>
            {/*保存input的ref到inputEl */}
            <input ref={inputEl} type="text"/>
            <button onClick = {onButtonClick}>在input上展示文字</button>
        </>
    )
}
export default Example8