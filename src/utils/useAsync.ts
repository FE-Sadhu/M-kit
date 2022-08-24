import {useState} from 'react';

interface AsyncState<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const INITIAL_DATA: AsyncState<null> = {
  error: null,
  data: null,
  stat: 'idle',
};

export const useAsync = <D>(initState?: AsyncState<D>) => {
  const [state, setState] = useState<AsyncState<D>>(initState ?? {...INITIAL_DATA});

  const run = (promise: Promise<D>) => {
    setState({...state, stat: 'loading'});
    promise.then((data) => {
      setState({...state, data, stat: 'success'});
    }).catch(e => setState({...state, error: e, stat: 'error'}))
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