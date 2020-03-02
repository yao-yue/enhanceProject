// 测试下构造函数中的js

function Student(props) {
    this.name = props.name || 'Unnamed';
    console.log('++++++++++')
    console.log(this)
    console.log('++++++++++')
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    // 调用Student构造函数，绑定this变量:
    Student.call(this, props);
    console.log('-----------')
    console.log(this)
    console.log('-----------')
    this.grade = props.grade || 1;
}

// var xiaoming = new PrimaryStudent({
//     name: '小明',
//     grade: 2
// });

// var xiaozhang = new PrimaryStudent({
//     name: '小张',
//     grade: 3
// }); 

function simulateNew() {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj,arguments);  //让构造函数的this绑定在实例上
    return obj
}

var xiaoming = simulateNew(PrimaryStudent, {
         name: '小张',
        grade: 3})
/* 最后的输出结果
++++++++++
PrimaryStudent { name: '小张' }
++++++++++
-----------
PrimaryStudent { name: '小张' }
-----------


思考：  构造函数的this是动态绑定的，是需要看调用时的环境

new的内部构造，创建一个空对象，绑定原型链，构造函数的this绑定在空对象上

自己手写的this也是生成一样的输出，最后的结果就是发现 Student中的this和Pri'marystudent中的this都指向实例小张，都是动态指定的。
*/
