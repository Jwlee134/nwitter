import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

interface Props {
  loggedIn: boolean;
  user: User;
}

const Router = ({ loggedIn, user }: Props) => (
  <HashRouter>
    {loggedIn && <Navigation />}
    <Switch>
      {loggedIn ? (
        <>
          <Route exact path="/">
            <Home user={user} />
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

export default Router;
