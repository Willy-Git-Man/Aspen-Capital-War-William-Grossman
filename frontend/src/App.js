import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import StartGame from "./components/StartGame";
import StartGameUserList from "./components/StartGameUserList";
import GamePage from "./components/GamePage";
import LeaderBoard from "./components/LeaderBoard";
import Deck from "./components/Deck";
import GameLogic from "./components/GameLogic";
import ProfileButton from "./components/Navigation/ProfileButton";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);





  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && !sessionUser &&(
        <Switch>
          <Route path="/">
            <div className="nonSessionMenu">
            <LoginFormPage />
            <SignupFormPage />

            </div>
          </Route>


        </Switch>
      )}
      {sessionUser && (
        <Switch>
          <Route exact path="/">
            <NavLink to="/LeaderBoard">LeaderBoard</NavLink>
            <StartGame />
          </Route>

          <Route exact path="/StartGame">
            <NavLink exact to="/">Home</NavLink>
            <StartGameUserList />
          </Route>

          <Route path="/LeaderBoard">
            <NavLink exact to="/">Home</NavLink>
            <LeaderBoard />
          </Route>

          <Route path="/StartGame/:id">
            <NavLink exact to="/">Home</NavLink>
            <GamePage user={sessionUser} />
            <GameLogic />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
