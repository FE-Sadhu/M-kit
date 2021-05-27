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

interface ret<S> {
  value: S[];
  clear: () => void;
  removeIndex: (i: number) => void;
  add: (v: S) => void;
}

export const useArray = <T>(val: T[]): ret<T> => {
  const [value, setValue] = useState(val);

  const add = (item: T) => {
    setValue([...val, item]);
  };

  const removeIndex = (i: number) => {
    const copy = [...val];
    copy.splice(i, 1);
    setValue(copy);
  };

  const clear = () => setValue([]);

  return {
    value,
    add,
    removeIndex,
    clear,
  };
};
