import React, { useContext } from "react";
import { UserContext } from "../context/User";

import Router from "./Router";

const App = () => {
  const { initialized } = useContext(UserContext);

  return (
    <>
      {initialized ? <Router /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
