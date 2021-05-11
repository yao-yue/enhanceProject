import { withRouter} from 'next/router'
import Link from 'next/link'
import axios from 'axios'

const Xiaojiejie = ({router,list})=>{
    return (
        <>
            <div>{router.query.name},来为我们服务了 </div>
            <ol>
                {list.map(item => (
                    <li key={item.id}>author:{item.author} | book: {item.name}</li>
                    )
                )}
            </ol>
            <Link href="/"><a>返回首页</a></Link>
        </>
    )
}

Xiaojiejie.getInitialProps = async ()=>{
    const promise =new Promise((resolve)=>{
            axios('http://rect.red:3000/book/getJsBook').then(
                (res)=>{
                    console.log('远程数据结果：',res)
                    resolve(res.data)
                }
            )
    })
    return await promise
}

export default withRouter(Xiaojiejie)


