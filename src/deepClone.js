// 深拷贝

function deepClone(target) {
  let cloneTarget = Array.isArray(target) ? [] : {};
  if (target) {
    for(let key in target){
      if(target.hasOwnProperty(key)){
        if(typeof key === 'object'){
          cloneTarget[key] = deepClone(key);
        } else {
          cloneTarget[key] = target[key];
        }
      }
    }
  }
  return cloneTarget;
}