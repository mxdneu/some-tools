
// case 1

setTimeout(() => {
  console.log('hong1');
  Promise.resolve().then(() => {
    console.log(123);
  })
}, 0);

setTimeout(() => {
  console.log('hong2');
  Promise.resolve().then(() => {
    console.log(456);
  })
}, 0);

// hong1 -> 123 -> hong2 -> 456
// 在node12以后，node和浏览器表现形式就都是一样的了
// 之前node是 hong1 -> hong2 -> 123 -> 456