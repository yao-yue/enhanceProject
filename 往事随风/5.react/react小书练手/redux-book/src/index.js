import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import { Provider } from './react-redux'

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)   //根据动作更新state
        listeners.forEach(listener => listener())  //把订阅都执行一遍
    }
    dispatch() //初始化state
    return { getState, dispatch, subscribe }
}
const themeReducer = (state, action) => { 
    if (!state) return {
        themeColor: 'red'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {
                ...state,
                themeColor: action.themeColor
            }
        default:
            return state
    }
}
const store = createStore(themeReducer)



export class Index extends Component {
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext() {
        return { store }
    }
    static propTypes = {

    }

    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

ReactDOM.render(
<Provider store={store}>
    <Index />
</Provider>, document.getElementById('root'))
