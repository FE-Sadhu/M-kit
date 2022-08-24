import {useState} from 'react';

interface AsyncState<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

interface Config {
  throwError: boolean;
}

const INITIAL_DATA: AsyncState<null> = {
  error: null,
  data: null,
  stat: 'idle',
};

const DEFAULT_CONFIG: Config = {
  throwError: false
}

export const useAsync = <D>(initState?: AsyncState<D>, config?: Config) => {
  const [state, setState] = useState<AsyncState<D>>(initState ?? {...INITIAL_DATA});
  const mergeConfig = {...DEFAULT_CONFIG, ...config};

  const run = (promise: Promise<D>) => {
    setState({...state, stat: 'loading'});
    return promise.then((data) => {
      setState({...state, data, stat: 'success'});
      return data;
    }).catch(e => { 
      setState({...state, error: e, stat: 'error'});
      return mergeConfig.throwError ? Promise.reject(e) : e;
    })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    data: state.data,
    error: state.error,
    run
  }
}