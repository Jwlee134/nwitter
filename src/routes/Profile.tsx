import React from "react";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { onLogOut, onChange, onSubmit, userObj, newName } = useProfile();

  return (
    <>
      {userObj?.displayName !== null && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            onChange={onChange}
            value={newName as string}
          />
          <input type="submit" value="Save" />
        </form>
      )}
      <button onClick={onLogOut}>Sign Out</button>
    </>
  );
};

export default Profile;
