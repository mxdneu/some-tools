const myPromise = require('../src/myPromise');

// let p1  = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     const num = Math.random()*300;
//     if (num > 100) {
//       resolve(num);
//     } else {
//       reject(num);
//     }
//   }, 0);
// }).then(res => {
//   console.log('resolve', res)
// }, err => {
//   console.log('reject', err);
// });

let p1  = new myPromise((resolve, reject) => {
  setTimeout(() => {
    const num = Math.random()*300;
    if (num > 100) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 0);
});

const p2 = p1.then(res => {
  return res + "asd";
}, err => { console.log(err, 'errr') });

const p3 = p2.then(res => {
  console.log(res);
});
