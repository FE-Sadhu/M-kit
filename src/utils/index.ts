import { useEffect, useState } from 'react';

export const isFalsy: (value: unknown) => boolean = (value) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

export const useDebouncedState = <V>(val: V, delay = 200) => {
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
