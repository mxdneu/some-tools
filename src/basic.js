// new过程的操作

function howNew(obj, ...args) {
  // 新建对象
  let newObj = {};
  // 继承对象原型
  newObj.__proto__ = obj.prototype;
  // 改变this指向
  obj.call(newObj, ...args);
  return newObj;
}

// 函数科里化
function curry(fn) {
  let args = Array.prototype.slice.call(arguments, 1);
  return function() {
      const innerArgs = Array.prototype.slice.call(arguments);
      return fn.apply(null, args.concat(innerArgs));
  }
}

// 变形
function curry1(fn, ...args) {
  let all = args || [];
  let len = args.length;
  return (...rest) => {
    let _args = all;
    _args.push(...rest);
    if (rest.length === 0) {
      return fn.apply(this, _args);
    } else {
      return curry1.apply(this, fn, ..._args);
    }
  }
}

// 柯里化应用，bind函数