function deepClone(obj) {
    if(typeof obj !== 'object') return;
    var newObj = obj instanceof Array?[]: {}
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
        }
    }
    return newObj
}


let obj= {
    a: 1,
    b: [1,2,3],
    c: {
        d: 1,
        e: 2,
        f: 3,
        g: {
            h: 1,
            i: 2
        }
    } 
}

let obj2 = deepClone(obj)

console.log(obj2)
obj2.a = 4
console.log('修改后的obj2', obj2)   //{ a: 4, b: [ 1, 2, 3 ], c: { d: 1, e: 2, f: 3 } }
console.log('是否会影响之前的obj？',obj) //{ a: 1, b: [ 1, 2, 3 ], c: { d: 1, e: 2, f: 3 } }
// 经验证不会

console.log(deepClone(1))