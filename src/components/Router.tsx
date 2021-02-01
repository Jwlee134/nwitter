import React, { useContext } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/User";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const Router = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <HashRouter>
      {loggedIn && <Navigation />}
      <Switch>
        {loggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default Router;
