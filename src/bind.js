
// bind
Function.prototype.myBind = function(context) {
  let self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var bindArgs = Array.prototype.slice.call(arguments);
    self.apply(context, args.concat(bindArgs));
  }
}


Function.prototype.hisBind = function(context) {
  const self = this;
  const firstArg = Array.prototype.slice.call(arguments, 1);
  return function() {
    const sec = Array.prototype.slice.call(arguments);
    return self.apply(context, firstArg.concat(sec));
  }
}