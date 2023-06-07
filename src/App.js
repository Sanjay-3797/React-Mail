import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import MainNavigation from "./components/MainNavigation";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <React.Fragment>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        {isLoggedIn && (
          <Route path="/home">
            <Home />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/profile">
            <Profile />
          </Route>
        )}
      </Switch>
    </React.Fragment>
  );
}

export default App;
