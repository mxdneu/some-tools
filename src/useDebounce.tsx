import React, { useRef, useEffect } from 'react';

const useDebounce = ({ fn, delay }) => {
  const { current } = useRef({ fn, timer: null });

  useEffect(() => {
    current.fn = fn;
  }, []);

  return (...args) => {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }
}

export default useDebounce;
