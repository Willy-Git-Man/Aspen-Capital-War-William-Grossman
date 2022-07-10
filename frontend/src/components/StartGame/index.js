import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, Redirect, NavLink } from 'react-router-dom';

function StartGame() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
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
   <NavLink to="/StartGame">
    Choose Opponent
   </NavLink>

  );
}


export default StartGame;
