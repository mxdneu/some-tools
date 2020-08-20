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