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

      {isLoaded && !sessionUser && (
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
            <div className="mainMenu">
              <NavLink to="/LeaderBoard">LeaderBoard</NavLink>
              <StartGame />
              <Navigation isLoaded={isLoaded} />
            </div>
          </Route>

          <Route exact path="/StartGame">
            <StartGameUserList />
            <Navigation isLoaded={isLoaded} />
          </Route>

          <Route exat path="/LeaderBoard">
            <LeaderBoard />
            <Navigation isLoaded={isLoaded} />
          </Route>

          <Route exact path="/StartGame/:id">
            <GamePage user={sessionUser} />
            <GameLogic />
            <Navigation isLoaded={isLoaded} />
          </Route>
          
        </Switch>
      )}

    </>
  );
}

export default App;
