import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import StartGame from "./components/StartGame";
import StartGameUserList from "./components/StartGameUserList";
import GamePage from "./components/GamePage";

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
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/">
            <StartGame />
          </Route>
          <Route exact path="/StartGame">
            {/* Hello Start */}
            <StartGameUserList />
          </Route>
          <Route path="/StartGame/:id">
            hello
            {/* <StartGameUserList /> */}
        <GamePage user={sessionUser}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
