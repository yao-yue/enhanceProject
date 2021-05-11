// 'use strict';

// import {ListOfWords} from './ListOfWords.js'
// import "./test2.js";    //不能es6模块化，babel会把import转化为require

class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>;
    }
}
class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar'],
            num: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }
    add(a, b) {
        return a + b
    }
    handleClick() {
        // 这部分代码很糟，而且还有 bug 用push数组的改变会让react察觉不到
        //   const words = this.state.words;
        //   words.push('marklar');
        //   this.setState({words: words});
        this.setState(state => ({
            words: [...state.words, 'marklar'],
            num: this.add(state.num, 3)
        }));
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick} style={{width:100,height:30}}>click me</button>
                <ListOfWords words={this.state.words} />
                {this.state.num}
            </div>
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(WordAdder), domContainer);






