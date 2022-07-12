import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

function LeaderBoard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userResponse = await fetch("http://localhost:5000/api/users/");
      const userResponseData = await userResponse.json();
      setUsers(userResponseData);
    }
    fetchData();
  }, [dispatch]);

  // users = users.filter((user) => user.id !== sessionUser.id)
  users = users.sort((a,b) => a.wins > b.wins ? 1 : -1)

  return (
    <div className="userList">
      <h1>leaders</h1>
      {users.map((user) => (
          <p key={user.id}>{user.username} : {user.wins}</p>

      ))}
    </div>
  );
}


export default LeaderBoard;
