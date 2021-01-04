import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../base";

const Profile = () => {
  const history = useHistory();

  const onLogOut = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOut}>Sign Out</button>
    </>
  );
};

export default Profile;
