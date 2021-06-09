import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebouncedState, useMount } from '../../utils';
import { useHttp } from '../../utils/http';

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
  }, [debouncedParam]);

  useMount(() => {
    // TODO catch 呢？
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
