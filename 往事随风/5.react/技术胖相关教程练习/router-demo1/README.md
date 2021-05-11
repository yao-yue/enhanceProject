##  小笔记

### 在Route上允许动态传值
- 这个设置是以:开始的，然后紧跟着你传递的key（键名称）名称
```<Route path="/list/:id" component={List} />```
#### 四个步骤：  
1. Route   path后加上：允许传值的规则
2. Link上传值
3. 组件上接受值。let tempId=this.props.match.params.id
在声明周期componentDidMount中进行，传递的值在this.props.match中
match对象的属性：对象包括三个部分:
patch:自己定义的路由规则，可以清楚的看到是可以传递id参数的。
url: 真实的访问路径，这上面可以清楚的看到传递过来的参数是什么。
params：传递过来的参数，key和value值。

