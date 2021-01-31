import React, { useEffect, useState } from "react";
import { authService } from "../base";

import Router from "./Router";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user as User);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInitialized(true);
    });
  }, []);

  return (
    <>
      {initialized ? (
        <Router loggedIn={loggedIn} user={userObj as User} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
