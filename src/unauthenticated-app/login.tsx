import React from 'react';
import { useAuth } from '../context/auth-context';
import { Form, Input } from 'antd';
import { LongButton } from './index';
import { useAsync } from '../utils/useAsync';

type Props = {
  onError: Function
}

export const LoginScreen = ({onError}: Props) => {
  const { login } = useAuth();
  const {run, isLoading} = useAsync(void 0, {throwError : true});

  const handleSubmit = async (values: {username: string, password: string}) => {
    try {
      await run(login(values));      
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={'用户名'} type="text" id="username" autoComplete="on" />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={'密码'} type="password" id="password" autoComplete="on" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type="primary">登录</LongButton>
      </Form.Item>
    </Form>
  );
};
