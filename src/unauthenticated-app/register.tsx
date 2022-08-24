import React from 'react';
import { useAuth } from '../context/auth-context';
import { Form, Input } from 'antd';
import { LongButton } from './index';
import { useAsync } from '../utils/useAsync';

type Props = {
  onError: Function
}

export const RegisterScreen = ({onError}: Props) => {
  const { register } = useAuth();
  const {run, isLoading} = useAsync(void 0, {throwError : true});

  const handleSubmit = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'));
      return;
    }
    try {
      await run(register(values));
    } catch (error) {
      onError(error)
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
        <Input placeholder={'密码'} type="password" id="password" autoComplete="on"/>
      </Form.Item>
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: "请再次输入密码" }]}
      >
        <Input placeholder={'确认密码'} type="password" id="cpassword" autoComplete="on"/>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type="primary">注册</LongButton>
      </Form.Item>
    </Form>
  );
};
