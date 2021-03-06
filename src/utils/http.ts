import * as qs from 'qs';
import * as auth from '../auth-provider';
import { useAuth } from '../context/auth-context';


const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      "Content-Type": data ? 'application/json' : '',
    },
    ...customConfig,
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // fetch 和 axios 不一样，axios 可以直接在返回状态不为 2xx 的时候抛出异常 （内部自己处理的）
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      // 用户没有访问权限，需要进行身份认证
      await auth.logout();
      window.location.reload();
      return Promise.reject({message: '需要进行身份认证，请重新登录'})
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth();
  // Parameters >>> Obtain the parameters of a function type in a tuple
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// some testing codes
/** 
interface Person {
  name: string,
  age: number
}

type PersonKeys = keyof Person
const b: PersonKeys = 'name';

const xiaoMing: Partial<Person> = {name: '1'}
const shenMiRen: Omit<Person, 'name'> = {age: 1, name: 's'}
*/