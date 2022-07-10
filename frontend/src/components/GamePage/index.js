import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';

function GamePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [users, setUsers] = useState([]);


  const {id} = useParams()

  // console.log( sessionUser.id)
console.log('id',id)

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

const opponent = users.filter((user) => user.id === Number(id))
console.log(opponent)

console.log(sessionUser)

  return (
    <div className="userList">
     <p>{sessionUser.username}</p>
     <p>{opponent[0].username}</p>

    </div>
  );
}


export default GamePage;
