import { useEffect, useRef, useState } from 'react';

export const isFalsy: (value: unknown) => boolean = (value) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: {[propName: string]: unknown}) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
    // TODO 依赖项里加上 callback 会造成无限循环，这个和 useCallback 以及 useMemo 有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [val, delay]);
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
  // 页面加载时: 旧title
  // 加载后：新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
