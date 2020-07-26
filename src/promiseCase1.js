// Promise 调度相关，
// JS 实现一个带并发限制的异步调度器 Scheduler
// 保证同时运行的任务最多有两个

class LimitPromise {
  constructor(max) {
    // 最大并发数
    this._max = max;
    // 当前运行数
    this._count = 0;
    // 执行池
    this._taskQueue = [];
  }

  call(caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = this._createTask(caller, args, resolve, reject);
      if (this._count >= this._max) {
        this._taskQueue.push(task);
      } else {
        task();
      }
    });
  }

  _createTask(caller, args, resolve, reject) {
    return () => {
      caller(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this._count--;
          if (this._taskQueue.length) {
            let tast = this._taskQueue.shift();
            tast();
          }
        })
      this._count++;
    }
  }

}

module.exports = LimitPromise;

