import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTable, useSortBy } from 'react-table'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format } from 'date-fns'
import { StyledGigTable } from '../styles/GigTable.styled'

const Users = () => {

  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  let isMounted = true;
  const controller = new AbortController();


  const getUsers = async () => {    
    try {
      console.log('--- Users - getUsers.js');
      const response = await axiosPrivate.get('/users', {
        signal: controller.signal
      });
      console.log(response.data);

      isMounted && setUsers(response.data);

    } catch (err) {
      console.log('---getUsers failed');
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    console.log('---users.js -- useEffect');


    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  //? TABLE #################################
  const usersColumns = [
    {
      Header: 'Username',
      Footer: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Role',
      Footer: 'Role',
      accessor: 'roles',
    },
    {
      Header: 'ID',
      Footer: 'ID',
      accessor: '_id'
    },
  ]
  const newColumns = useMemo(() => usersColumns, []) 
  const tableInstance = useTable({
    columns: newColumns,
    data: users //* this was using 'newData'

  }, useSortBy)
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance




  return (
    <article>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user?.username}</li>)}
            {users.map((user, i) => <li key={i}>{user?._id}</li>)}
            {users.map((user, i) => <li key={i}>{user?.roles.User}</li>)}
          </ul>
        ) 
        : <p>No users to display</p>
      }

    </article>
  );
};

export default Users;
