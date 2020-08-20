// 测试简单的redux使用

const { createStore } = require('../src/redux');

function reducer(state = {}, aciton) {
  switch(aciton.type) {
    case 'ADD':
      return Object.assign(state, aciton.payload);
    default:
      return state;
  }
}

const store = createStore(reducer);

// action creator
function addSum(num) {
  const temNum = Math.pow(num, 2);
  // this is action
  return {
    type: 'ADD',
    payload: {
      num: temNum,
    }
  };
}

const updateNum = function(num) {
  return store.dispatch(addSum(num));
}

updateNum(2);

updateNum(5);

console.log(store.getState());