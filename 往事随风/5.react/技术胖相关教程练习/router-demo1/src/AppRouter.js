import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'  //imrr
import Index from './Pages/Index'
import List from './Pages/List'
import Home from './Pages/Home'

function AppRouter() {
    return (
        <Router>
            <ul>
                {/* 一个坑  link标签要把文字包起来 */}
                <li> <Link to='/' >首页</Link></li>
                <li> <Link to='/list/123' >列表</Link></li>
            </ul>
            <Route path="/" exact component={Index} />
            <Route path="/list/:id" component={List} />
            <Route path="/home/" component={Home} />
        </Router>
    )
}

export default AppRouter
