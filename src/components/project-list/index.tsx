import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebouncedState, useMount } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from "@emotion/styled";


export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedParam = useDebouncedState(param, 1000);

  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    // TODO catch 呢？
    client('projects', {
      data: cleanObject(debouncedParam),
    }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    // TODO catch 呢？
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;