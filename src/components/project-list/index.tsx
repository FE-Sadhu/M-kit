import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List, Project } from './list';
import { cleanObject, useDebouncedState, useMount } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from "@emotion/styled";
import { Typography } from 'antd';
import { useAsync } from '../../utils/useAsync';


export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedParam = useDebouncedState(param, 1000);
  const {run, isLoading, isError, error, data: list} = useAsync<Project[]>()
  const client = useHttp();

  useEffect(() => {
    run(client('projects', {
      data: cleanObject(debouncedParam),
    }))
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {isError && <Typography.Text>{error!.message}</Typography.Text> }
      <List 
        users={users}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;