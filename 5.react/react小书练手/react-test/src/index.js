// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));


// serviceWorker.unregister();
/* --------------------------------------------------- */
// import React from "react";
// import ReactDOM from "react-dom";
// // import "./styles.css";

// function App() {
//   return (
//     <div className="App">
//       <AAA />
//     </div>
//   );
// }

// class AAA extends React.Component {
//   state = {
//     age: 666
//   };

//   add = () => {
//     console.log('调用父组件的方法age+1')
//     this.setState({ age: this.state.age + 1 });
//   };

//   render() {
//     return (
//       <div>
//         <ChildA onChangeParent={this.add} age={this.state.age} />
//       </div>
//     );
//   }
// }

// class ChildA extends React.Component {
//   state = {
//     num: 888
//   };
//  	// 根据新的属性对象派生状态对象    
//   // nextProps——新的属性对象 prevState——旧的状态对象
//   static getDerivedStateFromProps(nextprops, state) {
//     console.log('nextprops',nextprops);
//     console.log('state',state)
//     // 返回一个对象来更新 state 或者返回 null 来表示接收到的 props 不需要更新 state 
//     if (nextprops.age !== state.age) {
//       console.log("更新吧");
//       return {
//         //返回的对象将映射到state中
//         onChangeParent:nextprops.onChangeParent,
//         age: nextprops.age,
//         // 注意：这里不需要把组件自身的状态也放进来
//         // num:state.num
//       };
//     }else {
//         console.log('不更新state');
//         return null;
//     }
//   }

//   add = () => {
//       console.log('调用自身的方法num+1')
//     this.setState({ num: this.state.num + 1 });
//   };
//   render() {
//     const { onChangeParent } = this.state;
//     console.log('当前的state',this.state);
//     return (
//       <>
//         <div onClick={onChangeParent}>调用父组件的方法age+1</div>
//         <div onClick={this.add}>调用自身的方法num+1</div>
//       </>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);


import React, { Component } from "react";
import ReactDOM from "react-dom";


function App() {
  return (
    <div className="App">
      <GetSnapshotBeforeUpdate />
    </div>
  );
}

class GetSnapshotBeforeUpdate extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = { messages: [] };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        messages: ["msg:" + this.state.messages.length, ...this.state.messages]
      });
      //this.setState({messages:[...this.state.messages,this.state.messages.length]});
    }, 1000);
  }
  getSnapshotBeforeUpdate() {
    // 返回更新内容的高度 300px
    return this.wrapper.current.scrollHeight;
  }
  //返回值将作为第三个参数传递给 componentDidUpdate
  componentDidUpdate(prevProps, prevState, prevScrollHeight) {
    this.wrapper.current.scrollTop =
      this.wrapper.current.scrollTop +
      (this.wrapper.current.scrollHeight - prevScrollHeight);
  }
  render() {
    let style = {
      height: "100px",
      width: "200px",
      border: "1px solid red",
      overflow: "auto"
    };
    return (
      <ul style={style} ref={this.wrapper}>
        {this.state.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
