import { useEffect, useState } from 'react';

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (fn) => {
  useEffect(() => {
    fn();
  }, []);
};

export const useDebouncedState = (val, delay) => {
  const [state, setState] = useState(val);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(val);
    }, delay);
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [val]);

  return state;
};
