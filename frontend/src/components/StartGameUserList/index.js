import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './UserList.css'

function StartGameUserList() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const userResponse = await fetch("/api/users/");
      const userResponseData = await userResponse.json();
      setUsers(userResponseData);
    }


    fetchData();
  }, [dispatch]);


  users = users.filter((user) => user.id !== sessionUser.id)

  return (
    <div className="userList">

      <NavLink to="/">Home</NavLink>
      <h1>Choose a Player</h1>

      {users.map((user) => (
          <NavLink key={user.id} to={`/StartGame/${user.id}`}>{user.username}</NavLink>

      ))}
    </div>
  );
}


export default StartGameUserList;
