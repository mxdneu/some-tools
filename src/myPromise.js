// 实现promise模块

class MyPromise {
  constructor(callBack) {
    this.random = Math.random()*300;
    this.status = 'pending';
    this.value = undefined;
    this.fulfillArr = [];
    this.rejectArr = [];
    let fulfillFn = result => {
      if (this.status !== 'pending') {
        return;
      }
      let timer = setTimeout(() => {
        this.status = 'fulfilled';
        this.value = result;
        this.fulfillArr.forEach(item => { item(this.value) });
      }, 0);
    }
    let rejectFn = result => {
      if (this.status !== 'pending') {
        return;
      }
      let timer = setTimeout(() => {
        this.status = 'rejected';
        this.value = result;
        this.rejectArr.forEach(item => { item(this.value) });
      })
    }
    try {
      callBack(fulfillFn, rejectFn);
    } catch (e) {
      rejectFn(e);
    }
  }

  //为类的静态方法，而不是在原型上
  static all(promiseAry = []) {
    let index = 0, 
        result = [];
    return new Promise((resolve, reject) => {
      for(let i = 0; i < promiseAry.length; i++){
        promiseAry[i].then(val => {
          index++;
          result[i] = val;
          if( index === promiseAry.length){
            resolve(result)
          }
        }, reject);
      }
    })
  }

  static allSettled(promiseAry = []) {
    let index = 0;
    let result = [];
    return new MyPromise((resolve, reject) => {
      for(let i = 0; i < promiseAry.length; i++) {
        promiseAry[i].then(val => {
          index++;
          result[i] = {
            value: val,
            status: 'fulfilled',
          };
        }, err => {
          index++;
          result[i] = {
            value: err,
            status: 'rejected',
          };
        }).finally(() => {
          if (index === promiseAry.length) {
            resolve(result);
          }
        })
      }
    });
  }


  then(fulfilledCallBack, rejectedCallBack) {
    typeof fulfilledCallBack !== 'function' ? fulfilledCallBack = result => result : null;
    typeof rejectedCallBack !== 'function' ? rejectedCallBack = reason => {
      throw new Error(reason);
    } : null;
    return new MyPromise((resolve, reject) => {
      this.fulfillArr.push(() => {
        try {
          let x = fulfilledCallBack(this.value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch(e) {
          reject(e);
        }
      });
      this.rejectArr.push(() => {
        try {
          let x = rejectedCallback(this.value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch(e) {
          reject(e);
        }
      });
    })
  }
}

module.exports = MyPromise;