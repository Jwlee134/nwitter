import React, { useEffect, useState } from "react";
import { authService } from "../base";

import Router from "./Router";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInitialized(true);
    });
  }, []);

  return (
    <>
      {initialized ? <Router loggedIn={loggedIn} /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
