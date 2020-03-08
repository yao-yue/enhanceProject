

  function renderApp (newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

  function createStore(reducer) {
    let state = null   //因为下面会调用dispatch然后初始化state
    const getState = () => state
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    //dispatch所做的就是把动作分发给reducer
    const dispatch = (action) => 
    {
        state = reducer(state, action) //覆盖原对象
        listeners.forEach((listener) => {
            listener()
        })
    }
    dispatch({}) // 初始化 state  
    return {
        getState,
        dispatch,
        subscribe
    }
  }

  function reducer(state, action) {
      if(!state) {
          return {
            title: {
                text: 'React.js 小书',
                color: 'red',
              },
              content: {
                text: 'React.js 小书内容',
                color: 'blue'
              }
          }
      }
      switch(action.type) {
          case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                  }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default: 
            return state
      }
  }

  const store = createStore(reducer)
  //缓存旧的state 
  let oldState = store.getState()
  store.subscribe(() => {
    const newState = store.getState() // 数据可能变化，获取新的 state
    renderApp(newState, oldState) // 把新旧的 state 传进去渲染
    oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
  })

  store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
  store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'green' }) // 修改标题颜色