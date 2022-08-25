import React, { ReactNode, useState } from 'react';
import * as auth from '../auth-provider';
import { User } from '../components/project-list/search-panel';
import { FullPageErrorFallback, FullPageLoading } from '../libs/lib';
import { http } from '../utils/http';
import { useMount } from '../utils/index';
import { useAsync } from '../utils/useAsync';

interface AuthForm {
  username: string;
  password: string;
}

// 所谓登录状态维持，就是刷新时跳到首页，在首页判断本地有无 token，有 token 则请求一下数据，跳到登录后的页面，没 token 的话就跳到登录前页面
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext =
  React.createContext<
    | {
        user: User | null;
        register: (form: AuthForm) => Promise<void>;
        login: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {run, data: user, isIdle, isLoading, isError, error} = useAsync<User | null>(void 0, {throwError: false})
  // point free
  const login = (form: AuthForm) => run(auth.login(form))
  const register = (form: AuthForm) => run(auth.register(form));
  const logout = () => auth.logout().then(() => run(Promise.resolve(null)));

  useMount(() => {
    // 登录状态维持
    run(bootstrapUser());
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  console.log(' dsadsadsa user 22', user)

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  console.log(' dsadsadsa user ', user)
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  // 读取 context 的值以及订阅 context 的变化
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
