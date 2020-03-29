import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
const Home = () => {
  function gotoA() {
    Router.push('/jspangA')
  }
  function gotoXiaojiejie() {
    // Router.push('/xiaojiejie?name=xxx')
    Router.push({
      pathname: '/xiaojiejie',
      query: {
        name: '井空'
      }
    })
  }
  Router.events.on('routeChangeStart', (...args) => {
    console.log('1.routeChangeStart->路由开始变化,参数为:', ...args)
  })

  Router.events.on('routeChangeComplete', (...args) => {
    console.log('2.routeChangeComplete->路由结束变化,参数为:', ...args)
  })

  Router.events.on('beforeHistoryChange', (...args) => {
    console.log('3,beforeHistoryChange->在改变浏览器 history之前触发,参数为:', ...args)
  })

  Router.events.on('routeChangeError', (...args) => {
    console.log('4,routeChangeError->跳转发生错误,参数为:', ...args)
  })

  Router.events.on('hashChangeStart', (...args) => {
    console.log('5,hashChangeStart->hash跳转开始时执行,参数为:', ...args)
  })

  Router.events.on('hashChangeComplete', (...args) => {
    console.log('6,hashChangeComplete->hash跳转完成时,参数为:', ...args)
  })

  return (
    <>
      <div>我是首页</div>
      <div>
        <Link href="/xiaojiejie?name=波多野结衣"><a>选波多野结衣</a></Link><br />
        <Link href="/xiaojiejie?name=苍井空"><a>选苍井空</a></Link>
        <div>
          <button onClick={gotoXiaojiejie}>去JspangA页面</button>
        </div>
        <div>
          <Link href="#jspang"><a>选JSPang</a></Link>
        </div>
      </div>
      {/* <div>
        <Link href="/jspangA">
          <a>
            <span>去JspangA页面</span>
            <span>前端博客</span>
          </a>
        </Link>
      </div>
      <div><Link href="/jspangB"><a>去JspangB页面</a></Link></div>
      <div>
        <button onClick={gotoA}>去JspangA页面</button>
      </div> */}
    </>
  )

}
export default Home