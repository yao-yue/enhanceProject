let a = [1,3,2,7,6,6,7,8,1,2,4,7,9,1,2,4,6,8,7,9,3,1,2,4,9,0,7]

function swap(array, left, right) {
    let temp = array[left]
    array[left] = array[right]
    array[right] = temp
}

function quickSort(array, left, right) {

    let index;
    if (array.length > 1) {
        index = partition2(array, left, right);
        if (left < index - 1) {
            quickSort(array, left, index - 1)
        } 
        if (index < right) {
            quickSort(array, index, right)
        }
    }

}

function partition(array, start, end) {
    // console.log(array)
    let index = parseInt(Math.random() * (end - start + 1));
    swap(array, index, end);

    let small = start - 1;
    for (index = start; index < end; index++) {
        if (array[index] < array[end]) {
            ++small;
            if (small !== index) {
                swap(array, index, small)
            }
        }
    }
    ++small;
    swap(array, small, end);
    return small
}


let partition2 = (array, left, right) => {
    //主元为中间的时候
    let pivot = array[Math.floor((right + left) / 2)], i = left, j = right;
    while (i <= j) {
        while (array[i] < pivot) {   //找到左边比主元大的元素
            i++;
        }
        while (array[j] > pivot) {   //找到右边比主元小的元素
            j--;
        }
        if (i <= j) {
            [array[i], array[j]] = [array[j], array[i]];
            // swarp(array, i , j)
            i++;
            j--;
        }
    }
    return i;
}


quickSort(a, 0, a.length - 1)
console.log(a)