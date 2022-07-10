import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

function StartGameUserList() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser)

  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const userResponse = await fetch("http://localhost:5000/api/users/");
      const userResponseData = await userResponse.json();
      setUsers(userResponseData);
      console.log(users)
    }
    fetchData();
  }, [dispatch]);

  console.log(users)





  return (
    <div className="userList">
      {users.map((user) => (
          <NavLink to={`/StartGame/${user.id}`}>{user.username}</NavLink>

      ))}
    </div>
  );
}


export default StartGameUserList;
