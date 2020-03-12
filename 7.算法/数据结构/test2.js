function quickSort(array, left, right) {
    if(left == right) {
        return;
    }
    let index = partition(array , left , right) 
    if(index > left) quickSort(array, left, index-1)
    if(index < right) quickSort(array, index +1, right) 
}
function swap(array, left, right) {
    let temp = array[left]
    array[left] = array[right]
    array[right] = temp
}
function partition(array, start, end) {
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

let a = [1,3,2,7,6,6,7,8,1,2,4,7,9,1,2,4,6,8,7,9,3,1,2,4,9,0,7]
quickSort(a, 0, a.length - 1)
console.log(a)