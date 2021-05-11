import React from "react";
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import Index from './Pages/Index'
import Video from './Pages/Video'
import Workplace from './Pages/WorkPlace'
import './index.css'

function AppRouter() {
    let routeConfig =[
        {path:'/',title:'博客首页',exact:true,component:Index},
        {path:'/video/',title:'视频教程',exact:false,component:Video},
        {path:'/workplace/',title:'职场技能',exact:false,component:Workplace}
    ]  //动态配置路由 到时候再映射。
    return (
      <Router>
          <div className="mainDiv">
            <div className="leftNav">
                <h3>一级导航</h3>
                <ul>
                    <li> <Link to="/">博客首页</Link> </li>
                    <li><Link to="/video/">视频教程</Link> </li>
                    <li><Link to="/workplace">职场技能</Link> </li>
                </ul>
            </div>

            <div className="rightMain">
                <Route path="/"  exact component={Index} />
                <Route path="/video/"   component={Video} />
                <Route path="/workplace/"   component={Workplace} />
            </div>
          </div>
      </Router>
    );
  }

  export default AppRouter;