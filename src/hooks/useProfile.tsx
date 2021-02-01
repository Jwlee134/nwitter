import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../base";
import { UserContext } from "../context/User";

const useProfile = () => {
  const history = useHistory();
  const { userObj, refreshUser } = useContext(UserContext);
  const [newName, setNewName] = useState(userObj?.displayName);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewName(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userObj?.displayName !== newName) {
      await userObj?.updateProfile({
        displayName: newName,
      });
      refreshUser();
    }
  };

  const onLogOut = () => {
    authService.signOut();
    history.push("/");
  };

  return { onLogOut, onChange, onSubmit, userObj, newName };
};

export default useProfile;
