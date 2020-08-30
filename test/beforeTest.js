// 深拷贝
function deepClone(target) {
  let tem = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      if (typeof target[key] === 'object') {
        tem[key] = deepClone(target[key]);
      } else {
        tem[key] = target[key];
      }
    }
  }
  return tem;
} 

// 实现eventEmitter
class myEvent{
  constructor() {
    this._events = {};
  }

  on(event, callback) {
    const callbacks = this._events[event] || [];
    callbacks.push(callback);
    this._events[event] = callbacks;
  }

  off(event, callback) {
    if (!this._events[event]) {
      return;
    }
    const callbacks = this._events[event].filter(item => item !== callback);
    this._events[event] = callbacks;
  }

  emit(event, ...args) {
    const callbacks = this._events[event];
    callbacks && callbacks.forEach(item => {
      item(...args);
    });
  }

  once(event, callback) {
    const wraper = (...args) => {
      callback(...args);
      this.off(event, callback);
    }
    this.on(event, wraper);
  }
}

class MyPromise {
  constructor(callback) {
    this.value = null;
    this.status = 'pending';
    this.fulArr = [];
    this.rejectArr = [];
    let fulFn = result => {
      if (this.status !== 'pending') {
        return;
      }
      let timer = setTimeout(() => {
        this.value = result;
        this.status = 'fulfilled';
        this.fulArr.forEach(item => {
          item(this.value);
        });
      }, 0);
    }
    let rejectFn = result => {
      if (this.status !== 'pending') {
        return;
      }
      let timer = setTimeout(() => {
        this.value = result;
        this.status = 'rejected';
        this.rejectArr.forEach(item => {
          item(this.value);
        });
      }, 0);
    }
    try {
      callback(fulFn, rejectFn);
    } catch(e) {
      rejectFn(e);
    }
  }

  then(fulfilledCallback, rejectedCallback) {
    typeof fulfilledCallback !== 'function' && (fulfilledCallback = result => result);
    typeof rejectedCallback !== 'function' && (rejectedCallback = reason => reason);
    return new MyPromise((resolve, reject) => {
      this.fulArr.push(() => {
        let x = fulfilledCallback(this.value);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
      });
      this.rejectArr.push(() => {
        let x = rejectedCallback(this.value);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
      });
    })
  }
}