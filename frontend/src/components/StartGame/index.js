import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, Redirect, NavLink } from 'react-router-dom';

function StartGame() {

  return (
   <NavLink to="/StartGame">
    Choose Opponent
   </NavLink>

  );
}


export default StartGame;
