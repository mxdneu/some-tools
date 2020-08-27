class Scheduler {
  constructor() {
    this._max = 2;
    this._taskArr = [];
    this._count = 0;
  }

  add(promiseCreator) {
    return new Promise((resovle, reject) => {
      const task = this._creatTask(promiseCreator, resovle, reject);
      if (this._count >= this._max) {
        this._taskArr.push(task);
      } else {
        task();
      }
    });
  }

  _creatTask(fn, resolve, reject) {
    return () => {
      fn()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this._count--;
        if (this._taskArr.length) {
          const task = this._taskArr.shift();
          task();
        }
      });
      this._count++;
    }
  }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
    scheduler
    .add(() => timeout(time))
    .then(() => console.log(order))
}


addTask(1000, '1');
addTask(1000, '2');
addTask(1000, '3');
addTask(1000, '4');