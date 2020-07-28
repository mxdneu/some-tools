timerFun();

function timerFun(){
  console.log('要执行的操作');
  let timer=setTimeout(function(){
  timerFun();
  clearTimeout(timer)
  },1000);
}