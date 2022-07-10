import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './UserList.css'

function StartGameUserList() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log('test',sessionUser)

  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const userResponse = await fetch("http://localhost:5000/api/users/");
      const userResponseData = await userResponse.json();
      setUsers(userResponseData);
    }
    fetchData();
  }, [dispatch]);




  return (
    <div className="userList">
      <h1>Choose a Player</h1>
      {users.map((user) => (
          <NavLink to={`/StartGame/${user.id}`}>{user.username}</NavLink>

      ))}
    </div>
  );
}


export default StartGameUserList;
