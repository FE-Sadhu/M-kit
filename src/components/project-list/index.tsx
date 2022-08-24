import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebouncedState, useMount } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from "@emotion/styled";
import { Typography } from 'antd';


export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedParam = useDebouncedState(param, 1000);

  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    setLoading(true);
    client('projects', {
      data: cleanObject(debouncedParam),
    })
    .then((data) => {
      setList(data);
      setError(null)
    })
    .catch((e) => {
      setError(e);
      setList([])
    })
    .finally(() => setLoading(false))
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
      {error && <Typography.Text>{error.message}</Typography.Text> }
      <List 
        users={users}
        dataSource={list}
        loading={loading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;