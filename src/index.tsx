import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProviders } from './context/index';
import { loadDevTools } from 'jira-dev-tool';
// 引入 .Less 是为了使用 css 变量改变主题
import 'antd/dist/antd.less'

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.querySelector('#root'),
  );
});
