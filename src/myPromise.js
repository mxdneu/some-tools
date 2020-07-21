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