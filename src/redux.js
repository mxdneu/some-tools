// 实现一个简单的redux，有getState，dispatch，sub

const createStore = function(reducer, initialState) {
  let currentState = initialState || undefined;
  let currentReducer = reducer;
  let listeners = []; // 监听器
  const getState = () => (currentState);
  const dispatch = action => {
    currentState = currentReducer(currentState, action);
    listeners.forEach(item => {
      item();
    });
    return this;
  }
  const subcribe = fn => {
    listeners.push(fn);
  }
  return {
    getState,
    dispatch,
    subcribe,
  };
}

module.exports = {
  createStore
};