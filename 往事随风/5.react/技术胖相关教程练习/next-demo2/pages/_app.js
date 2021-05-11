//解决打包报错问题
/* 
其实是我们在加入Ant Design的样式时产生的，
这个已经在Ant Design的Github上被提出了，
但目前还没有被修改，你可以改完全局引入CSS解决问题
 */


import App from 'next/app'

import 'antd/dist/antd.css'

export default App