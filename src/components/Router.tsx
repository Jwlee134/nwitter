import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { authService } from "../base";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(authService.currentUser);

  return (
    <HashRouter>
      <Switch>
        {loggedIn ? (
          <>
            <Route exact path="/">
              <Home />
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
