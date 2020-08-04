
class MyEvent {
  constructor() {
    this._events = {};
  }

  on(event, callback) {
    let callbacks = this._events[event] || [];
    callbacks.push(callback);
    this._events[event] = callbacks;
    return this;
  }

  off(event, callback) {
    let callbacks = this._events[event];
    this._events[event] = callbacks && callbacks.filter(fn => (fn !== callback));
    // this._events[event] = callbacks && callbacks.filter(fn => {
    //   console.log(fn, callback, callback === fn);
    //   return (fn !== callback);
    // });
    return this;
  }

  once(event, callback) {
    let wrap = (...args) => {
      callback(...args);
      this.off(event, wrap);
    };
    this.on(event, wrap);
    return this;
  }

  emit(event, ...args) {
    const callbacks = this._events[event];
    callbacks.forEach(fn => {
      fn(...args);
    });
    return this;
  }
}

module.exports = MyEvent;


class mEvent {
  constructor() {
    this._events = {};
  }

  on(event, callback) {
    const callbacks = this._events[event] || [];
    callbacks.push(callback);
    this._events[event] = callbacks;
  }

  off(event, callback) {
    let callbacks = this._events[event];
    if (callbacks && callbacks.length) {
      callbacks = callbacks.filter(item => (item !== callback));
    }
    this._events[event] = callbacks;
  }

  once(event, callback) {
    const wrap = (...args) => {
      callback(...args);
      this.off(event, callback);
    }
    this.on(event, wrap);
  }

  emit(event, ...args) {
    const callbacks = this._events[event] || [];
    if (callbacks.length) {
      callbacks.forEach(item => {
        item(...args);
      });
    }
  }
}

module.exports = mEvent;