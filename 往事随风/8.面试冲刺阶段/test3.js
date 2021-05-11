// let a = `www.rect.reda=1&b=2`

// let b = (~a.indexOf('?')) ? 1 :0
// console.log((~a.indexOf('?')))
// console.log(!!(-13))

// 获取argument对象 类数组对象 不能调用数组方法
// function test1() {
//     console.log('获取argument对象 类数组对象 不能调用数组方法', arguments);
//   }

//   // 获取参数数组  可以调用数组方法
//   function test2(...args) {
//     console.log('获取参数数组  可以调用数组方法', args);
//   }

//   // 获取除第一个参数的剩余参数数组
//   function test3(first, ...args) {
//     console.log('获取argument对象 类数组对象 不能调用数组方法', args);
//   }

//   // 透传参数
//   function test4(first, ...args) {
//     fn(...args);
//     fn(...arguments);
//     // console.log('arguments转化成数组:', Array.prototype.slice.call(arguments,1))
//   }

//   function fn() {
//     console.log('透传', ...arguments);
//     console.log('arguments:', arguments)
//   }

//   test1(1, 2, 3);
//   test2(1, 2, 3);
//   test3(1, 2, 3);
//   test4(1, 2, 3);

//   用...展开运算符可以使arguments类数组变成数组,要在(参数括号里才能转化)

console.log(!null)
console.log([] ==  null)