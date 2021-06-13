import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProviders } from './context/index';
import { DevTools, loadServer } from "jira-dev-tool";
// 引入 .Less 是为了使用 css 变量改变主题
import 'antd/dist/antd.less';

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.querySelector('#root'),
  );
});
