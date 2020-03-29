// import Head from 'next/head'
import Myheader from '../components/myheader'
import  '../static/test.css'
// import { Button } from 'antd'

function Header() {
    return (
        <div>
            {/* <Head>
                <title>ripple is best</title>
                <meta charSet="utf-8" />
            </Head> */}
                <Myheader/>
                {/* <Button>antd按钮</Button> */}
                <div>Jspang.com</div>
        </div>
        
    )
}

export default  Header
