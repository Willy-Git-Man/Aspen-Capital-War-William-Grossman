import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );

  }

  return (
      <div className="mainMenu">
        {/* <NavLink exact to="/">Home</NavLink> */}
     
        {isLoaded && sessionLinks }
      </div>
  );
}

export default Navigation;
