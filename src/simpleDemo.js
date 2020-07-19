// 传入一个长度为32的数组，转换成一个4*8的二维数组
function createArr(len) {
  const arr = [];
  for(let i = 0;i < len;i++) {
    const number = Math.floor(Math.random()*300);
    arr.push(number);
  }
  return arr;
}

function changeTo(arr) {
  const arr1 = arr.splice(0, 8);
  const arr2 = arr.splice(0, 8);
  const arr3 = arr.splice(0, 8);
  const arr4 = arr.splice(0, 8);
  console.log(arr1, arr2, arr3, arr4);
}