class Scheduler {
  constructor() {
    this._max = 2;
    this._taskArr = [];
    this._count = 0;
  }

  add(fn) {
    return new Promise((resolve, reject) => {
      const task = this._creakTask(fn, resolve, reject);
      if (this._count < this._max) {
        task();
      } else {
        this._taskArr.push(task);
      }
    })
  }

  _creakTask(fn, resolve, reject) {
    return () => {
      fn().then()
      .catch()
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