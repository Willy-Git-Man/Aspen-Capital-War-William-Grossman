import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';

function GamePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { id } = useParams()
  const [users, setUsers] = useState([]);
  const [opponent, setOppoinent] = useState([])
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const userResponse = await fetch("http://localhost:5000/api/users/");
      const userResponseData = await userResponse.json();
      setUsers(userResponseData);

      setOppoinent(userResponseData.filter((user) => user.id === Number(id)))
      console.log('hello', opponent)
      console.log(users)
    }
    fetchData();
    setLoading(false)
  }, [dispatch]);

  return (
    <div className="userList">
      {opponent.length > 0 && (
        <>

          <p>Home Team: {sessionUser.username}</p>
          <p>Opponent: {opponent[0].username}</p>
        </>

      )}

    </div>
  )
}


export default GamePage;
