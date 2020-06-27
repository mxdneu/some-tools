// 防抖和截流函数

// 测试方法

const toTop = document.getElementById('toTop');

function showTop() {
  const top = document.body.scrollTop;
  console.log('top:', top);
}

// window.addEventListener('scroll', showTop);

// debounce防抖
// 什么是防抖 在事件第一次触发时，不执行函数，而是设置一个期限值
// 在这个期限值内不再触发再执行函数，期限值内触发重新计算时间


function debounce(fn,delay){
  let timer = null; //借助闭包
  return function() {
      if(timer){
          clearTimeout(timer) 
      }
      timer = setTimeout(fn,delay) // 简化写法
  }
}

//window.addEventListener('scroll', debounce(showTop, 2000));


// throttle 截流，在函数触发一段时间内，不再触发函数

function throttle(fn, time) {
  let valve = true;
  return function() {
    if (!valve) {
      return false;
    }
    valve = false;
    setTimeout(() => {
      fn();
      valve = true;
    }, time);
  }
}

function throttle1(fn, time) {
  let start = Date.now();
  return function() {
    let now = Date.now();
    const context = this;
    if (now - start >= time) {
      fn.apply(context);
      start = Date.now();
    }
  }
}

toTop.addEventListener('click', throttle1(showTop, 2000));
