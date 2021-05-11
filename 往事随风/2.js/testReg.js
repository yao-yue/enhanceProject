// 测试正则

// 1.获取链接 https://www.baidu.com?name=jawil&age=23 name的value值
// let target = `https://www.baidu.com?nawme=ja+wil&age=23`
// function getParamName(attr) {

//     let match = RegExp(`[?&]${attr}=([^&]*)`) //分组运算符是为了把结果存到exec函数返回的结果里
//       .exec(target)
//     //["?name=jawil", "jawil", index: 0, input: "?name=jawil&age=23"]
//     console.log(match)  // match[1]是分组捕获的结果
//     return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) // url中+号表示空格,要替换掉 //前面的match是短路运算符防止没有匹配到
//   }
//   console.log(getParamName('name'))

// 2.2、 数字格式化问题，1234567890 --> 1,234,567,890
// \B  和  \b的区别
// \b 匹配单词边界，注意连续的数字、字母或下划线组成的字符串会认为一个单词
// 'adobe(2016) ps6.4'.match(/\b(\w+)/g);
// // ["adobe", "2016", "ps6", "4"]
// ● \B 匹配非单词边界，仔细体会下面的示例与\b的结果
// 例如在字符串中所有位置中，扣掉\b，剩下的都是\B的
// 'adobe(2016) ps6.4'.match(/\B(\w+)/g);  匹配到的东西是[边界]（规则）不会包含边界的东西
// ["dobe", "016", "s6"]
// 注意点二： （？）非捕获用法  也就是捕获的东西返回途中筛掉不要在后面的数组里出现
// (?= xxx ) 匹配后面紧跟xxx字符的字符串
// (?! n )   匹配后面没有紧跟xxx字符的字符串
// (?<=)     前紧跟
// (?<! )    前不紧跟

// let target = '1234567890'
// let b = target.match(/(?=(\d{3})+(?!\d))/g)  //这里是匹配到了三个边界 [ '', '', '' ]
// console.log(b) /* 非边界：234567890 567890 890 */
// let format = target.replace(/\B(?=(\d{3})+(?!\d))/g,',')
// console.log(format)

// /\B(?=(\d{3})+\b)/g

// 3、去掉字符串左右两边的空格，" jaw il " --> “jaw il”
// function trim(str) {
//     return str.replace(/(^\s*)|(\s*$)/g, "")
// }

// [闯关模式练习正则表达式，完成一个个正则匹配的测验](http://regex.alf.nu)
// [ 通过实际练习掌握正则表达式](http://regexone.com/)
// [正则挑战，有不同难度，很丰富](https://regexcrossword.com/)
// [正则挑战，完成正则匹配要求](http://callumacrae.github.io/regex-tuesday/)



 

 
 