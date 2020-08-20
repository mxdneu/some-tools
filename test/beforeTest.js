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