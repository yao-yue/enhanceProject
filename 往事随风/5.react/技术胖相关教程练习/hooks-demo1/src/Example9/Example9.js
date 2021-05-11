import React, { useState ,useEffect ,useCallback } from 'react';

function useWinSize(){
    //size初始值是一个对象
    const [ size , setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })

    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    },[]) 
    useEffect(()=>{
        //getDerivedStatesFromProps()  初始化的时候会调用
        // console.log('我被调用了')
        window.addEventListener('resize',onResize)
        return ()=>{
            //willunmount
            window.removeEventListener('resize',onResize)
        }
    },[])

    return size;

}

function Example9(){

    const size = useWinSize()
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}

export default Example9