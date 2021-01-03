import React from "react";

import Router from "./Router";

const App = () => {
  return (
    <>
      <Router />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
