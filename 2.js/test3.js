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

function isNiceNum(numStr) {
    //参数校验 
    if(!numStr) return 'N'
    numStr = numStr.toString()
    let regex = /(([\d])([\d])([\d])([\d]))+$/
    let checkAdd = numStr.match(regex)
    console.log(checkAdd)
 
}

console.log(isNiceNum(numStr))