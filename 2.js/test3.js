// function getProp(propPath) {
//     //参数校验
//     //if(typeof propPath !== 'string') {
//     //    throw TypeError('type error')
//     //}
//     if(!propPath) {
//     return 'unknown'
//     }
//     let pathArr = propPath.split('.')
//     let data = {
//         company: {
//             name: 'Shopee',
//             location: {
//                 country: 'China',
//                 city: 'SZ'
//             }
//         },
//         industry: 'e-commerce'
//     }
//     let res 
//     console.log(pathArr)
//     for(let i = 0;i < pathArr.length; i++) {
//         if(Object.keys(data).indexOf(pathArr[i]) >= 0) {
//             data = data[pathArr[i]]
//             res = data
//         }else {
//             return 'unknown'
//         }
//     }
//     return res
// }

// let propPath = `company.location.city`
// console.log(getProp(propPath))

let numStr = '13590406666'

let regex = /(\d{4})+/g
let res = numStr.match(regex)
console.log(RegExp.$1)         //可以得到match结果里面的值

console.log(res)