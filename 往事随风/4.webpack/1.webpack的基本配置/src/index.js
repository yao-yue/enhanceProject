/* 入口起点文件
webpack ./src/index.js -o ./build/build.js --mode=development
??? 老是报错
*/

import './index.css'

function add(a, b) {
    return a + b;
}

console.log(add(1,3));