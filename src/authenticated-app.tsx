import React from 'react';
import { ProjectListScreen } from './components/project-list';
import { useAuth } from './context/auth-context';
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import styled from "@emotion/styled";
import { Row } from './libs/lib';
import {Dropdown, Menu, Button} from 'antd';
import { useDocumentTitle } from './utils';
import { Routes, Route } from 'react-router';
import { ProjectScreen } from './components/project';
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
  useDocumentTitle('登录后', false)
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path="/project" element={<ProjectListScreen />}/>
          <Route path="/project/:projectId/*" element={<ProjectScreen />}/>
        </Routes>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();

return <Header between={true}>
<HeaderLeft gap={true}>
<SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
  <h3>项目</h3>
  <h3>用户</h3>
</HeaderLeft>
<HeaderRight>
  <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={'link'} onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>
      }
    >
    <Button type={'link'} onClick={(e) => e.preventDefault()}>Hi, {user?.name}</Button>
  </Dropdown>
</HeaderRight>
</Header>;
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-areas: 
  "header"
  "main";
  height: 100vh;
`;


// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;