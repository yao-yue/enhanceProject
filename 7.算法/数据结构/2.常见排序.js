// 排序用的通用函数，检查是否为数组
function isArray(ary) {
    return Object.prototype.toString.call(ary).slice(8,13) === 'Array'
}

// 交换
function swap(item1, item2) {
    let temp = item1;
    item1 = item2;
    item2 = temp;
}
// 更好的交换法
function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue 
}

// ## 冒泡排序
// 从最后一个元素遍历，把第一个元素与之比较如果第一个元素大就交换他们，然后再到第二个元素再比较交换他们。
// 逐渐大元素放到了后面
function bubleSort(array) {
    //参数校验
    if(isArray(array)) {
        for(let i = 0, len =array.length; i< len; i++) {
            for(let j= 1; j < i; j++) {
                if (array[j] > array[j + 1]) swap(array, j, j + 1)
            }
        }
    }
    return array
}

// ## 插入排序
//从前往后，逐步排列成次序
function insertSort(array) {
    //参数校验
    for(let i = 1,len = array.length; i< len; i++) {
        for(let j = i -1; j >= 0; j--) {   //j是指示前面的i要比较几个的
            if(array[j+1] < array[j]) {
                swap(array[j+1] ,array[j])
            }
        }
    }
}

// 选择排序
//从左到右，每次都选择出最小的元素放到其对应的位置
function selectSort(array) {
    let len = array.length
    for(let i = 0; i< len; i++) {
        let minIndex = 0  // 用变量保存最小值的索引
        for(let j = i+1 ; j < len -1; j++)  {  //从左到右找到最小的那个值用Index标记出他
            minIndex = array[j] < array[minIndex] ? j : minIndex
        }
    }
    return array
}


//二路并归 
// 递归的将数组两两分开直到最多包含两个元素，然后将数组排序合并，最终合并为排序好的数组
// 递归的本质就是压栈，每递归执行一次函数，就将该函数的信息（比如参数，内部的变量，执行到的行数）压栈，
// 直到遇到终止条件，然后出栈并继续执行函数
function mergeSort(array, left, right) {
    if(left == right) return;  //递归终止条件
    let mid = left + (right - left) >> 1
    mergeSort(array, left, mid)
    mergeSort(array, mid+1, right)

    let help = [];
    let i = 0;
    let p1 = left, 
    p2 = mid +1;
    while(p1 <= mid && p2 <= right) {    //比较2个数组，把最小的放入辅助数组
        help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++]
    }
    while(p1 <= mid) {    //把比较完剩余的直接放入辅助数组
        help[i++] = array[p1++]
    }
    while(p2 <= right) {
        help[i++] = array[p2++]
    }
    for(let i = 0; i< help.length; i++) {    //最后把辅助数组装进原数组。
        help[left+i] = help[i]
    }

    return array
}


// ## 快排


// ## 二分排序


// ## 